# src/modules/exchange_connector/secrets_manager.py

import boto3
import json

secrets_client = boto3.client('secretsmanager')

def store_api_keys(user_id: str, api_key: str, secret_key: str):
    """Store API keys securely in AWS Secrets Manager"""
    secret_name = f"trading_bot/{user_id}/exchange_keys"
    
    secret_data = json.dumps({"api_key": api_key, "secret_key": secret_key})
    
    response = secrets_client.create_secret(
        Name=secret_name,
        SecretString=secret_data
    )
    return response

def get_api_keys(user_id: str):
    """Retrieve API keys securely"""
    secret_name = f"trading_bot/{user_id}/exchange_keys"
    
    response = secrets_client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])