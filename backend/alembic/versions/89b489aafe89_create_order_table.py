"""create order table

Revision ID: 89b489aafe89
Revises: 5897201ae2e0
Create Date: 2024-07-23 10:39:10.940272

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "89b489aafe89"
down_revision: Union[str, None] = "5897201ae2e0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "order",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("billing_id", sa.Integer(), nullable=False),
        sa.Column("shipping_id", sa.Integer(), nullable=False),
        sa.Column("order_date", sa.Date(), nullable=False),
        sa.Column("status", sa.String(length=255), nullable=False),
        sa.Column("subtotal", sa.Float(), nullable=False, default=0),
        sa.Column("tax", sa.Float(), nullable=False, default=0),
        sa.Column("subtotal_cost", sa.Float(), nullable=False, default=0),
        sa.Column("total_amount", sa.Float(), nullable=False, default=0),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
        sa.ForeignKeyConstraint(
            ["billing_id"],
            ["address.id"],
        ),
        sa.ForeignKeyConstraint(
            ["shipping_id"],
            ["address.id"],
        ),
    )


def downgrade() -> None:
    op.drop_table("order")
