"""
React-fast-template Utility Script

"""

import os
import re

import click


@click.group(context_settings=dict(help_option_names=["-h", "--help"]))
def cli() -> None:
    """DB Utility Script!!!.
    """
    pass

@cli.command()
@click.option(
    "-n",
    "--name",
    required=True,
    type=str,
    help="the name of the model"
)
@click.pass_context
def run(ctx, name:str) -> None:
    print(f"Creating controller for  model {name}")
    """
    The scripts creates a new controller file in the backend/api directory.
    """
    try:
        directory = '../backend/api'
        template_path = '../backend/templates/controller.txt'
        # Create the directory if it doesn't exist
        os.makedirs(directory, exist_ok=True)

        # Specify the file name (you can customize this if needed)
        file_name = f"{name}s.py"

        # Join the directory path and file name
        file_path = os.path.join(directory, file_name)

        # Check if the file already exists
        if os.path.exists(file_path):
            print(f"Error: File '{file_name}' already exists in '{directory}'. Aborting operation.")
            return

        # Read the template content from the specified file
        with open(template_path, 'r') as template_file:
            template_content = template_file.read()

        # Substitute the placeholder with the provided name
        template_content = re.sub(r'{{name}}', name, template_content)
        template_content = re.sub(r'{{cname}}', name.capitalize(), template_content)

        # Write the template content to the new file
        with open(file_path, 'w') as new_file:
            new_file.write(template_content)

        print(f"File '{file_name}' created successfully in '{directory}' using the template '{template_path}'.")

    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == '__main__':
    cli()
