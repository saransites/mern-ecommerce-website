import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette?.secondary?.main,
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme?.spacing(2),
  backgroundColor: theme?.palette?.grey[400],
  borderRadius: theme?.shape?.borderRadius,
  boxShadow: theme?.shadows[1],
  position: 'sticky',
  top: theme.spacing(8),
  zIndex: 1,
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme?.palette?.primary?.main}`,
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(18),
}));

const FilterLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  letterSpacing: 0.5,
  fontWeight: 500,
  color: theme.palette?.primary.light,
}));

const FilterProducts = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleRatingChange = (event, newValue) => {
    setSelectedRating(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      rating: selectedRating,
      priceRange,
    });
  }, [selectedCategories, selectedRating, priceRange, onFilterChange]);

  return (
    <FilterSection>
      <FilterTitle>Filters</FilterTitle>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledAccordion
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{color:"#fff"}}/>}>
                <FilterLabel>Categories</FilterLabel>
              </AccordionSummary>
              <AccordionDetails>
                {categories?.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        size="small"
                        sx={{color:"#fff"}}
                      />
                    }
                    label={category}
                    sx={{ "& .MuiTypography-root": { fontSize: 14,color:"#f0f2f9",letterSpacing:0.5 } }}
                  />
                ))}
              </AccordionDetails>
            </StyledAccordion>
          </Grid>

          <Grid item xs={12}>
            <StyledAccordion
              expanded={expanded === "panel2"}
              onChange={handleAccordionChange("panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{color:"#fff"}}/>}>
                <FilterLabel>Rating</FilterLabel>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={selectedRating}
                  onChange={handleRatingChange}
                  aria-labelledby="rating-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={5}
                  sx={{ color: "#fff",letterSpacing:0.5 }}
                />
              </AccordionDetails>
            </StyledAccordion>
          </Grid>

          <Grid item xs={12}>
            <StyledAccordion
              expanded={expanded === "panel3"}
              onChange={handleAccordionChange("panel3")}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{color:"#fff"}}/>}>
                <FilterLabel>Price</FilterLabel>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  sx={{ color: "#fff" }}
                />
                <Typography variant="body2" sx={{ mt: 1,color:"#fff",letterSpacing:0.5 }}>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          </Grid>
        </Grid>
      </Box>
    </FilterSection>
  );
};

export default FilterProducts;
