"""create products table

Revision ID: 3373971ee397
Revises: bb9f18cd94c4
Create Date: 2024-07-08 14:30:53.215539

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '3373971ee397'
down_revision: Union[str, None] = 'bb9f18cd94c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
