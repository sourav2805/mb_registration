import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
const MBMaxRegistration = () => {
  const [formData, setFormData] = useState({
    dealer_code: "",
    dealership_name: "",
    dealership_dba: "",
    dealership_street: "",
    dealership_city: "",
    dealership_state: "",
    dealership_zip: "",
    dealership_webiste: "",
    dealership_phnumber: "",
    dealer_principal_first_name: "",
    dealer_principal_last_name: "",
    dealer_principal_email: "",
    general_sales_mgr_first_name: "",
    general_sales_mgr_last_name: "",
    general_sales_mgr_email: "",
    general_service_mgr_first_name: "",
    general_service_mgr_last_name: "",
    general_service_mgr_email: "",
    controller_first_name: "",
    controller_last_name: "",
    controller_email: "",
    billing_contact_first_name: "",
    billing_contact_last_name: "",
    billing_contact_email: "",
    marketingTeam: "",
    marketing_contact_first_name: "",
    marketing_contact_last_name: "",
    marketing_contact_email: "",
    marketing_contact_dms_provider: "",
    marketing_contact_service_scheduler_provider: "",
    dealership_bdc: null,
    amenities: [],
  });
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dealership_bdc: event.target.value === "yes" ? true : false,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    fetch("http://localhost:3000/add-dealer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data inserted successfully:", data);
        // Optionally, reset form fields here
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedAmenities = [...formData.amenities];

    if (checked) {
      updatedAmenities.push(value);
    } else {
      updatedAmenities = updatedAmenities.filter((item) => item !== value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: updatedAmenities,
    }));
  };

  // Function to handle onBlur event
  const handleBlur = () => {
    // Fetch record from backend based on the dealer code
    fetchRecordFromBackend(formData.dealer_code);
    console.log(formData.dealer_code);
  };
  const fetchRecordFromBackend = (dealerCode) => {
    fetch(`http://localhost:3000/dealer-info/${dealerCode}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching record:", error));
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            color: "#000",
            textAlign: "center",
            fontFamily: "MB Corpo A Title Cond Office",
            fontSize: "55px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          Dealership MAX Registration Form
        </Box>

        <Box
          sx={{
            width: "536px",
            height: "101px",
            color: "#000",
            textAlign: "center",
            fontFamily: "MB Corpo S Text",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: "140%" /* 28px */,
          }}
        >
          Over the upcoming months, we will be sharing more and more details
          about the new MAX program, the new marketing channels, and how to
          optimize your marketing.
        </Box>
      </div>
      {/* SECTION FORM */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit} // Handle form submission
        sx={{
          border: "2px solid red",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Box
          as="div"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "10px",
            margin: "auto",
            justifyContent: "space-around",
            alignItems: "center",
            border: "2px solid red",
            textAlign: "left",
          }}
        >
          <TextField
            id="dealer-code"
            label="Dealer Code *"
            variant="standard"
            sx={{
              color: "#666",
              fontFamily: "MB Corpo S Text",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              // lineHeight: "140%" /* 22.4px */,
              textAlign: "left", // Specify the text alignment
            }}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                dealer_code: e.target.value,
              }))
            }
            onBlur={handleBlur}
          />

          <TextField
            id="dealer-name"
            label="Dealership Name *"
            variant="standard"
            value={formData.dealership_name}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                dealership_name: e.target.value,
              }))
            }
          />
          <TextField
            id="dealer-dba"
            label="Dealership DBA *"
            variant="standard"
            value={formData.dealership_dba}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                dealership_dba: e.target.value,
              }))
            }
          />
        </Box>
        <Box
          as="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            margin: "auto",
            justifyContent: "left",
            alignItems: "center",
            border: "2px solid green",
            textAlign: "left",
          }}
        >
          {" "}
          <p
            style={{
              color: "#000",
              fontFamily: '"MB Corpo A Text Cond"',
              fontSize: "32px",
              border: "2px solid red",
              fontStyle: "normal",
              fontWeight: "400",
              display: "flex",
              margin: "auto",
              alignItems: "start",
              textAlign: "start",
            }}
          >
            Dealership Address
          </p>
          <TextField
            id="street"
            label="Street"
            variant="standard"
            value={formData.dealership_street}
            sx={{
              width: "610px",
              // height: "40px", // Add a suitable height value
              flexShrink: 0, // Use camelCase for flex-shrink
            }}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                dealership_street: e.target.value,
              }))
            }
          />
          <br />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              columnGap: "10%",
            }}
          >
            <TextField
              id="city"
              label="City"
              variant="standard"
              sx={{ width: "280px", height: "0px", flexShrink: 0 }}
              value={formData.dealership_city}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealership_city: e.target.value,
                }))
              }
            />
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                label="State"
                variant="standard"
                value={formData.dealership_state}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    dealership_state: e.target.value,
                  }))
                }
              >
                <MenuItem value="">Select State</MenuItem>
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="zip"
              label="Zip"
              variant="standard"
              value={formData.dealership_zip}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealership_zip: e.target.value,
                }))
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <TextField
              id="dealership_website_address"
              label="Dealership Website Address"
              variant="standard"
              sx={{ width: "280px" }}
              value={formData.dealership_webiste}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealership_webiste: e.target.value,
                }))
              }
            />
            <TextField
              id="dealership_phone_number"
              label="Dealership Phone Number"
              variant="standard"
              sx={{ width: "280px" }}
              value={formData.dealership_phnumber}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealership_phnumber: e.target.value,
                }))
              }
            />
          </Box>
        </Box>

        {/* Dealer Principal */}
        <Box
          as="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            margin: "auto",
            justifyContent: "left",
            alignItems: "center",
            border: "2px solid green",
            textAlign: "left",
          }}
        >
          <p
            id="dealer_principal"
            style={{
              color: "#000",
              fontFamily: '"MB Corpo A Text Cond"',
              fontSize: "32px",
              border: "2px solid red",
              fontStyle: "normal",
              fontWeight: "400",
              display: "flex",
              margin: "auto",
              alignItems: "start",
              textAlign: "start",
            }}
          >
            Dealer Principal
          </p>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "10%",
            }}
          >
            <TextField
              id="dealer_principal_first_name"
              label="First Name"
              variant="standard"
              sx={{ width: "280px" }}
              value={formData.dealer_principal_first_name}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealer_principal_first_name: e.target.value,
                }))
              }
            />
            <TextField
              id="dealer_principal_last_name"
              label="Last Name"
              variant="standard"
              sx={{ width: "280px" }}
              value={formData.dealer_principal_last_name}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealer_principal_last_name: e.target.value,
                }))
              }
            />
            <TextField
              id="dealer_principal_email"
              label="Email"
              variant="standard"
              sx={{ width: "280px" }}
              value={formData.dealer_principal_email}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealer_principal_email: e.target.value,
                }))
              }
            />
          </Box>
        </Box>
        {/* General Sales Manager */}
        <p id="general_sales_manager">General Sales Manager</p>
        <TextField
          id="general_sales_manager_first_name"
          label="First Name"
          variant="standard"
          value={formData.general_sales_mgr_first_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_sales_mgr_first_name: e.target.value,
            }))
          }
        />
        <TextField
          id="general_sales_manager_last_name"
          label="Last Name"
          variant="standard"
          value={formData.general_sales_mgr_last_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_sales_mgr_last_name: e.target.value,
            }))
          }
        />
        <TextField
          id="general_sales_manager_email"
          label="Email"
          variant="standard"
          value={formData.general_service_mgr_email}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_service_mgr_email: e.target.value,
            }))
          }
        />

        {/* General Service Manager */}
        <p id="general_service_manager">General Service Manager</p>
        <TextField
          id="general_service_manager_first_name"
          label="First Name"
          variant="standard"
          value={formData.general_service_mgr_first_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_service_mgr_first_name: e.target.value,
            }))
          }
        />
        <TextField
          id="general_service_manager_last_name"
          label="Last Name"
          variant="standard"
          value={formData.general_service_mgr_last_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_service_mgr_last_name: e.target.value,
            }))
          }
        />
        <TextField
          id="general_service_manager_email"
          label="Email"
          variant="standard"
          value={formData.general_service_mgr_email}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              general_service_mgr_email: e.target.value,
            }))
          }
        />

        {/* Controller */}
        <p id="controller">Controller</p>
        <TextField
          id="controller_first_name"
          label="First Name"
          variant="standard"
          value={formData.controller_first_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              controller_first_name: e.target.value,
            }))
          }
        />
        <TextField
          id="controller_last_name"
          label="Last Name"
          variant="standard"
          value={formData.controller_last_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              controller_last_name: e.target.value,
            }))
          }
        />
        <TextField
          id="controller_email"
          label="Email"
          variant="standard"
          value={formData.controller_email}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              controller_email: e.target.value,
            }))
          }
        />

        {/* Billing Contact */}
        <p id="billing_contact">Billing Contact</p>
        <TextField
          id="billing_contact_first_name"
          label="First Name"
          variant="standard"
          value={formData.billing_contact_first_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              billing_contact_first_name: e.target.value,
            }))
          }
        />
        <TextField
          id="billing_contact_last_name"
          label="Last Name"
          variant="standard"
          value={formData.billing_contact_last_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              billing_contact_last_name: e.target.value,
            }))
          }
        />
        <TextField
          id="billing_contact_email"
          label="Email"
          variant="standard"
          value={formData.billing_contact_email}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              billing_contact_email: e.target.value,
            }))
          }
        />

        {/* Marketing Team */}
        <p id="marketing_team">Marketing Team</p>
        <InputLabel id="marketing-team-label">Select One</InputLabel>
        <Select
          labelId="marketing-team-label"
          id="marketing-team"
          label="Marketing Team"
          variant="standard"
          value={formData.marketingTeam}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketingTeam: e.target.value,
            }))
          }
        >
          <MenuItem value="">Select Team</MenuItem>
          <MenuItem value="one">ONE</MenuItem>
          <MenuItem value="two">TWO</MenuItem>
        </Select>

        {/* Marketing Contact */}
        <p id="marketing_contact">Marketing Contact</p>
        <TextField
          id="marketing_contact_first_name"
          label="First Name"
          variant="standard"
          value={formData.marketing_contact_first_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketing_contact_first_name: e.target.value,
            }))
          }
        />
        <TextField
          id="marketing_contact_last_name"
          label="Last Name"
          variant="standard"
          value={formData.marketing_contact_last_name}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketing_contact_last_name: e.target.value,
            }))
          }
        />
        <TextField
          id="marketing_contact_email"
          label="Email"
          variant="standard"
          value={formData.marketing_contact_email}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketing_contact_email: e.target.value,
            }))
          }
        />

        {/* DMS Provider */}
        <TextField
          id="dms_provider"
          label="DMS Provider"
          variant="standard"
          value={formData.marketing_contact_dms_provider}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketing_contact_dms_provider: e.target.value,
            }))
          }
        />

        {/* Service Scheduler Provider */}
        <TextField
          id="service_scheduler_provider"
          label="Service Scheduler Provider"
          variant="standard"
          value={formData.marketing_contact_service_scheduler_provider}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              marketing_contact_service_scheduler_provider: e.target.value,
            }))
          }
        />

        {/* BDC */}
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Does your dealership have an established BDC?
          </FormLabel>
          <RadioGroup
            aria-label="bdc"
            name="bdc"
            value={value || formData.dealership_bdc}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {/* FIXME Need to send array */}
        <Container>
          <p>Amenities</p>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="Complimentary Wash and Vacuum with Service"
              />
            }
            label="Complimentary Wash and Vacuum with Service"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="Complimentary Multi-Point Inspection"
              />
            }
            label="Complimentary Multi-Point Inspection"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="Complimentary High Speed WiFi"
              />
            }
            label="Complimentary High Speed WiFi"
          />
        </Container>
        <Button type="submit">Submit</Button>
      </Box>
    </>
  );
};

export default MBMaxRegistration;
