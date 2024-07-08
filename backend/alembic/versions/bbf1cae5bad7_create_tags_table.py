"""create tags table

Revision ID: bbf1cae5bad7
Revises: eb8356a7b408
Create Date: 2024-07-08 14:25:37.485546

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = 'bbf1cae5bad7'
down_revision: Union[str, None] = 'eb8356a7b408'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
