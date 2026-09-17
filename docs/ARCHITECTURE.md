# NUMI Architecture

MASTER TEMPLATE → PRODUCT VERSION → CUSTOMER INSTANCE

Purchase: Checkout → Provider webhook → markOrderPaid → provision job → health check → delivery ready → accessGranted

Honesty: NOT_CONFIGURED when env missing. READY only with real instanceUrl + source + license + health.
