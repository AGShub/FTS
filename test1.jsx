<FormControl fullWidth>
  <InputLabel id="service-select-label">
    <span className="text-sm relative bottom-[6px]">
    Correspondence Preference<span className="text-red-700">*</span>
    </span>
  </InputLabel>
  <Select
    sx={{ height: "40px", borderRadius: "5px" }}
    labelId="service-select-label"
    id="service-select"
    
    label="Correspondence Preference"
    required
    name="indicomp_corr_preffer"
    value={donor.indicomp_corr_preffer}
    onChange={(e) => onInputChange(e)}
  >
    {corrpreffer.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.value}
      </MenuItem>
    ))}
  </Select> 
</FormControl>
