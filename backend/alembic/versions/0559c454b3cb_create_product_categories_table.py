"""create product_categories table

Revision ID: 0559c454b3cb
Revises: 3373971ee397
Create Date: 2024-07-08 14:32:39.387694

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '0559c454b3cb'
down_revision: Union[str, None] = '3373971ee397'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
