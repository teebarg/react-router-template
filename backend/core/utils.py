from dataclasses import dataclass
from pathlib import Path
from typing import Any

import emails  # type: ignore
from jinja2 import Template

from core.config import settings
from core.logging import logger


@dataclass
class EmailData:
    html_content: str
    subject: str


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_str = (
        Path(__file__).parent.parent / "email-templates" / "build" / template_name
    ).read_text()
    html_content = Template(template_str).render(context)
    return html_content


def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
) -> None:
    if not settings.EMAILS_ENABLED:
        return
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    elif settings.SMTP_SSL:
        smtp_options["ssl"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    logger.info(f"send email result: {response}")


def generate_test_email(email_to: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Test email"
    html_content = render_email_template(
        template_name="test_email.html",
        context={"project_name": settings.PROJECT_NAME, "email": email_to},
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_new_account_email(
    email_to: str, username: str, password: str
) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - New account for user {username}"
    html_content = render_email_template(
        template_name="new_account.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "username": username,
            "password": password,
            "email": email_to,
            "link": settings.server_host,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_data_export_email(download_link: str) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Your Data Export is Ready"
    html_content = render_email_template(
        template_name="data_export.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "download_link": download_link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_contact_form_email(
    name: str, email: str, phone: str, message: str
) -> EmailData:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - New Contact Email"
    html_content = render_email_template(
        template_name="contact_form.html",
        context={
            "project_name": settings.PROJECT_NAME,
            "name": name,
            "email": email,
            "phone": phone,
            "message": message,
        },
    )
    return EmailData(html_content=html_content, subject=subject)
