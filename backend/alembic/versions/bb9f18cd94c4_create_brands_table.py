"""create brands table

Revision ID: bb9f18cd94c4
Revises: bbf1cae5bad7
Create Date: 2024-07-08 14:26:09.739769

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = 'bb9f18cd94c4'
down_revision: Union[str, None] = 'bbf1cae5bad7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
