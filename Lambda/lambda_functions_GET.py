import logging
import pymysql.cursors
import json

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("Lambda GET Function Works!...")

def lambda_handler(event, context):
    logger.info(":lambda_handler:")

    # Extract dealer code from the request path parameters
    dealer_code = event.get('pathParameters', {}).get('dealercode')
    logger.info("dealer_code: %s", dealer_code)

    # Define the SQL query
    sql = "SELECT * FROM dealer_info_testing WHERE dealer_code = %s"
    
    headers = {
        'Expires': 'Thu, 01 Jan 1970 00:00:00 GMT',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Max-Age': '0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
    }
    
    # Execute the query
    try:
        # Create a MySQL connection pool
        connection_pool = pymysql.connect(
                            host='',
                            user='',
                            password='',
                            database='',
                            cursorclass=pymysql.cursors.DictCursor
                            )
        cursor = connection_pool.cursor()
        cursor.execute(sql, (dealer_code,))
        result = cursor.fetchone()
        cursor.close()
        connection_pool.close()

        # logger.info("result: %s", result)
        
        logger.info("json dumps result: %s", json.dumps(result))
        
        if result is None:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': '{"message": "Dealer info not found"}'
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result)
            }
            # return {
            #     'statusCode': 200,
            #     'body': json.dumps(result)
            # }
    except Exception as e:
        logger.error("Error fetching dealer info: %s", e)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': '{"message": "Error fetching dealer info"}'
        }