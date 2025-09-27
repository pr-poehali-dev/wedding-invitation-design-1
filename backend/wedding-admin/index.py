import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all wedding guest responses for admin review
    Args: event - dict with httpMethod, queryStringParameters for filtering
          context - object with request_id, function_name
    Returns: HTTP response dict with guest responses list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        try:
            # Get query parameters for filtering
            params = event.get('queryStringParameters', {}) or {}
            attending_filter = params.get('attending', '')
            alcohol_filter = params.get('alcohol', '')
            
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
            
            # Build query with filters
            base_query = """
                SELECT id, name, attending, alcohol_preference, message, created_at
                FROM wedding_responses
                WHERE 1=1
            """
            query_params = []
            
            if attending_filter and attending_filter in ['yes', 'no']:
                base_query += " AND attending = %s"
                query_params.append(attending_filter)
            
            if alcohol_filter and alcohol_filter in ['champagne', 'wine', 'vodka']:
                base_query += " AND alcohol_preference = %s"
                query_params.append(alcohol_filter)
            
            base_query += " ORDER BY created_at DESC"
            
            cursor.execute(base_query, query_params)
            results = cursor.fetchall()
            
            # Format results
            responses = []
            for row in results:
                responses.append({
                    'id': row[0],
                    'name': row[1],
                    'attending': row[2],
                    'alcohol_preference': row[3],
                    'message': row[4],
                    'created_at': row[5].isoformat() if row[5] else None
                })
            
            # Get statistics
            cursor.execute("SELECT COUNT(*) FROM wedding_responses WHERE attending = 'yes'")
            attending_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM wedding_responses WHERE attending = 'no'")
            not_attending_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT alcohol_preference, COUNT(*) FROM wedding_responses WHERE alcohol_preference IS NOT NULL GROUP BY alcohol_preference")
            alcohol_stats = dict(cursor.fetchall())
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'responses': responses,
                    'statistics': {
                        'total': len(responses),
                        'attending': attending_count,
                        'not_attending': not_attending_count,
                        'alcohol_preferences': alcohol_stats
                    }
                })
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