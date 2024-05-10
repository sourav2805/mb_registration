import logging
import pymysql.cursors
import json

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("Lambda PUT Function Works!...")

# Create a MySQL connection pool
connection_pool = pymysql.connect(
    host='',
    user='',
    password='',
    database='',
    cursorclass=pymysql.cursors.DictCursor
)

def lambda_handler(event, context):
    logger.info(":lambda_handler:")
    
    # Extract dealer code from the request path parameters
    dealer_code = event.get('pathParameters', {}).get('dealercode')
    logger.info("dealer_code: %s", dealer_code)
    
    # Extract data from the PUT request body
    request_body = json.loads(event['body'])
    # logger.info("request_: %s", request_body)
    
    # Define the SQL UPDATE query
    sql = """
    UPDATE dealer_info_testing
    SET
      dealership_name = %s,
      dealership_dba = %s,
      dealership_street = %s,
      dealership_city = %s,
      dealership_state = %s,
      dealership_zip = %s,
      dealership_webiste = %s,
      dealership_phnumber = %s,
      dealer_principal_first_name = %s,
      dealer_principal_last_name = %s,
      dealer_principal_email = %s,
      general_sales_mgr_first_name = %s,
      general_sales_mgr_last_name = %s,
      general_sales_mgr_email = %s,
      general_service_mgr_first_name = %s,
      general_service_mgr_last_name = %s,
      general_service_mgr_email = %s,
      controller_first_name = %s,
      controller_last_name = %s,
      controller_email = %s,
      billing_contact_first_name = %s,
      billing_contact_last_name = %s,
      billing_contact_email = %s,
      marketing_contact_first_name = %s,
      marketing_contact_last_name = %s,
      marketing_contact_email = %s,
      marketing_contact_dms_provider = %s,
      marketing_contact_service_scheduler_provider = %s,
      dealership_bdc = %s,
 
      sales_hours_sunday_open=%s,
      sales_hours_sunday_close=%s,
      sales_hours_monday_open=%s,
      sales_hours_monday_close=%s,
      sales_hours_tuesday_open=%s,
      sales_hours_tuesday_close=%s,
      sales_hours_wednesday_open=%s,
      sales_hours_wednesday_close=%s,
      sales_hours_thursday_open=%s,
      sales_hours_thursday_close=%s,
      sales_hours_friday_open=%s,
      sales_hours_friday_close=%s,
      sales_hours_saturday_open=%s,
      sales_hours_saturday_close=%s,
 
      service_hours_sunday_open=%s,
      service_hours_sunday_close=%s,
      service_hours_monday_open=%s,
      service_hours_monday_close=%s,
      service_hours_tuesday_open=%s,
      service_hours_tuesday_close=%s,
      service_hours_wednesday_open=%s,
      service_hours_wednesday_close=%s,
      service_hours_thursday_open=%s,
      service_hours_thursday_close=%s,
      service_hours_friday_open=%s,
      service_hours_friday_close=%s,
      service_hours_saturday_open=%s,
      service_hours_saturday_close=%s,
 
      parts_hours_sunday_open=%s,
      parts_hours_sunday_close=%s,
      parts_hours_monday_open=%s,
      parts_hours_monday_close=%s,
      parts_hours_tuesday_open=%s,
      parts_hours_tuesday_close=%s,
      parts_hours_wednesday_open=%s,
      parts_hours_wednesday_close=%s,
      parts_hours_thursday_open=%s,
      parts_hours_thursday_close=%s,
      parts_hours_friday_open=%s,
      parts_hours_friday_close=%s,
      parts_hours_saturday_open=%s,
      parts_hours_saturday_close=%s,
      amenities = %s,
      marketing_team=%s
 
    WHERE dealer_code = %s
    """
    
    # Extract values from the request body
    values = (
        request_body.get('dealership_name'),
        request_body.get('dealership_dba'),
        request_body.get('dealership_street'),
        request_body.get('dealership_city'),
        request_body.get('dealership_state'),
        request_body.get('dealership_zip'),
        request_body.get('dealership_website'),
        request_body.get('dealership_phnumber'),
        request_body.get('dealer_principal_first_name'),
        request_body.get('dealer_principal_last_name'),
        request_body.get('dealer_principal_email'),
        request_body.get('general_sales_mgr_first_name'),
        request_body.get('general_sales_mgr_last_name'),
        request_body.get('general_sales_mgr_email'),
        request_body.get('general_service_mgr_first_name'),
        request_body.get('general_service_mgr_last_name'),
        request_body.get('general_service_mgr_email'),
        request_body.get('controller_first_name'),
        request_body.get('controller_last_name'),
        request_body.get('controller_email'),
        request_body.get('billing_contact_first_name'),
        request_body.get('billing_contact_last_name'),
        request_body.get('billing_contact_email'),
        request_body.get('marketing_contact_first_name'),
        request_body.get('marketing_contact_last_name'),
        request_body.get('marketing_contact_email'),
        request_body.get('marketing_contact_dms_provider'),
        request_body.get('marketing_contact_service_scheduler_provider'),
        request_body.get('dealershipBdcBuffer'),
        request_body.get('sales_hours_sunday_open'),
        request_body.get('sales_hours_sunday_close'),
        request_body.get('sales_hours_monday_open'),
        request_body.get('sales_hours_monday_close'),
        request_body.get('sales_hours_tuesday_open'),
        request_body.get('sales_hours_tuesday_close'),
        request_body.get('sales_hours_wednesday_open'),
        request_body.get('sales_hours_wednesday_close'),
        request_body.get('sales_hours_thursday_open'),
        request_body.get('sales_hours_thursday_close'),
        request_body.get('sales_hours_friday_open'),
        request_body.get('sales_hours_friday_close'),
        request_body.get('sales_hours_saturday_open'),
        request_body.get('sales_hours_saturday_close'),
        request_body.get('service_hours_sunday_open'),
        request_body.get('service_hours_sunday_close'),
        request_body.get('service_hours_monday_open'),
        request_body.get('service_hours_monday_close'),
        request_body.get('service_hours_tuesday_open'),
        request_body.get('service_hours_tuesday_close'),
        request_body.get('service_hours_wednesday_open'),
        request_body.get('service_hours_wednesday_close'),
        request_body.get('service_hours_thursday_open'),
        request_body.get('service_hours_thursday_close'),
        request_body.get('service_hours_friday_open'),
        request_body.get('service_hours_friday_close'),
        request_body.get('service_hours_saturday_open'),
        request_body.get('service_hours_saturday_close'),
        request_body.get('parts_hours_sunday_open'),
        request_body.get('parts_hours_sunday_close'),
        request_body.get('parts_hours_monday_open'),
        request_body.get('parts_hours_monday_close'),
        request_body.get('parts_hours_tuesday_open'),
        request_body.get('parts_hours_tuesday_close'),
        request_body.get('parts_hours_wednesday_open'),
        request_body.get('parts_hours_wednesday_close'),
        request_body.get('parts_hours_thursday_open'),
        request_body.get('parts_hours_thursday_close'),
        request_body.get('parts_hours_friday_open'),
        request_body.get('parts_hours_friday_close'),
        request_body.get('parts_hours_saturday_open'),
        request_body.get('parts_hours_saturday_close'),
        request_body.get('amenities'),
        request_body.get('marketing_team'),
        dealer_code
    )
    
    # Execute the SQL UPDATE query
    try:
        with connection_pool.cursor() as cursor:
            cursor.execute(sql, values)
            print("values:", values)
            connection_pool.commit()
            logger.info("Update successful")
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,PUT',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    "Expires": '0'
                },
                'body': '{"message": "Dealer info updated successfully"}'
            }
    except Exception as e:
        logger.error("Error updating dealer info: %s", e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,PUT',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            'body': '{"message": "Error updating dealer info"}'
        }
