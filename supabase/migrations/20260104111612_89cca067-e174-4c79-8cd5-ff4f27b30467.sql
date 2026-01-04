-- Insert test data for market ticker
INSERT INTO platform_stats (id, metric_key, label, metric_value, geo_metadata)
VALUES 
  (6, 'hkbde_index', 'HKBDE Data Index', 12568.35, '{"daily_change": 156.28, "daily_change_percent": 1.26}'::jsonb),
  (7, 'hstech_index', 'Hang Seng Tech', 4523.18, '{"daily_change": -45.62, "daily_change_percent": -1.00}'::jsonb),
  (8, 'usd_cny', 'USD/CNY', 7.2485, '{}'::jsonb),
  (9, 'total_volume_hkd', 'Total Volume', 45600000000, '{}'::jsonb),
  (10, 'total_products', 'Listed Products', 63057, '{}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  metric_key = EXCLUDED.metric_key,
  label = EXCLUDED.label,
  metric_value = EXCLUDED.metric_value,
  geo_metadata = EXCLUDED.geo_metadata,
  updated_at = (now() AT TIME ZONE 'Asia/Hong_Kong'::text);