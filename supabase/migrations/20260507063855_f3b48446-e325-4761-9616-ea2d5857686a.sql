UPDATE public.token_datasets SET sample_url = '/samples/' || slug || '.json' WHERE slug IN (
  'industrial-defect-vision-cn','embodied-warehouse-rl','hk-traffic-multimodal',
  'clinical-emr-zh-corpus','city-iot-timeseries-gba','cultural-tourism-audio-cn',
  'finrisk-knowledge-graph'
);