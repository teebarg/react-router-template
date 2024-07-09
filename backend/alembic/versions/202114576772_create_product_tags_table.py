"""create product_tags table

Revision ID: 202114576772
Revises: 0559c454b3cb
Create Date: 2024-07-08 14:32:48.687905

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '202114576772'
down_revision: Union[str, None] = '0559c454b3cb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "product_tags",
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.Column("tag_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["product_id", "tag_id"], ["product.id", "tag.id"]
        ),
    )


def downgrade() -> None:
    op.drop_table("product_tags")
