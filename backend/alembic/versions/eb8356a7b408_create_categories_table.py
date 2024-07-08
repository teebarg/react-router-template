"""create categories table

Revision ID: eb8356a7b408
Revises: 9c0a54914c78
Create Date: 2024-07-08 14:24:17.549389

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = 'eb8356a7b408'
down_revision: Union[str, None] = '9c0a54914c78'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
