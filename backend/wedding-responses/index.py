import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save wedding guest responses to database
    Args: event - dict with httpMethod, body for POST requests
          context - object with request_id, function_name
    Returns: HTTP response dict with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            # Parse request body
            body_data = json.loads(event.get('body', '{}'))
            
            # Extract required fields
            name = body_data.get('name', '').strip()
            attending = body_data.get('attending', '').strip()
            alcohol_preference = body_data.get('alcohol', '').strip()
            message = body_data.get('message', '').strip()
            
            # Validate required fields
            if not name:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Имя обязательно для заполнения'})
                }
            
            if not attending or attending not in ['yes', 'no']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Необходимо указать, придете ли вы'})
                }
            
            # Validate alcohol preference if provided
            if alcohol_preference and alcohol_preference not in ['champagne', 'wine', 'vodka']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Некорректный выбор алкоголя'})
                }
            
            # Connect to database
            database_url = os.environ.get('DATABASE_URL')
            if not database_url:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Database connection not configured'})
                }
            
            conn = psycopg2.connect(database_url)
            cursor = conn.cursor()
            
            # Insert response into database
            insert_query = """
                INSERT INTO wedding_responses (name, attending, alcohol_preference, message)
                VALUES (%s, %s, %s, %s)
                RETURNING id, created_at
            """
            
            cursor.execute(insert_query, (name, attending, alcohol_preference or None, message or None))
            result = cursor.fetchone()
            
            conn.commit()
            cursor.close()
            conn.close()
            
            response_id, created_at = result
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Ваш ответ успешно сохранен!',
                    'id': response_id,
                    'created_at': created_at.isoformat()
                })
            }
            
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректный формат данных'})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }