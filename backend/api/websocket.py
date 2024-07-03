import json
from typing import Dict

import aio_pika
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from core.config import settings
from core.logging import logger


class ConnectionManager:
    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}

    async def connect(self, id: str, websocket: WebSocket) -> None:
        """
        Establishes a WebSocket connection and adds it to the list of active connections.

        Parameters:
        - websocket: The WebSocket object representing the connection.

        Returns:
        - None
        """
        await websocket.accept()
        self.connections[id] = websocket

    def disconnect(self, id: str) -> None:
        """
        Disconnects a WebSocket connection.

        Parameters:
        - websocket (WebSocket): The WebSocket connection to be disconnected.

        Returns:
        None
        """
        if id in self.connections:
            del self.connections[id]

    async def broadcast(self, id: str, data: dict, type: str = "general") -> None:
        """
        Broadcasts the given data to all active connections.

        Args:
            data (dict): The data to be sent as a JSON object.

        Returns:
            None
        """
        if id in self.connections:
            websocket = self.connections[id]
            await websocket.send_json({**data, "type": type})


manager = ConnectionManager()

router = APIRouter()


@router.websocket("/users/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """
    Handles the WebSocket endpoint.

    Args:
        websocket (WebSocket): The WebSocket connection.

    Returns:
        None
    """
    await manager.connect(id=user_id, websocket=websocket)
    try:
        await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.websocket("/{user_id}")
async def ws_notification_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(id=user_id, websocket=websocket)
    try:
        await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


async def consume_events():
    try:
        connection = await aio_pika.connect_robust(f"amqp://{settings.RABBITMQ_HOST}")
        channel = await connection.channel()
        queue = await channel.declare_queue("new_user")

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    event = json.loads(message.body)
                    await manager.broadcast(
                        id="nK12eRTbo",
                        data=event.get("content", {}),
                        type="registration",
                    )
    except Exception as e:
        logger.error(e)
