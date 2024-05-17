import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

// import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Assuming this is your custom clock icon
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { StateCodes } from "./StateCode";

// BASE URL Local
// const backend_url = "http://localhost:3000";

// API Gateway DEV
const backend_url = "https://fmebhqzrp9.execute-api.us-east-1.amazonaws.com/DEV"

// API Gateway PROD
// const backend_url = "https://fmebhqzrp9.execute-api.us-east-1.amazonaws.com/PROD/"
console.log("backend_url:", backend_url);

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
    sales_hours_sunday_open: "",
    sales_hours_sunday_close: "",
    sales_hours_monday_open: "",
    sales_hours_monday_close: "",
    sales_hours_tuesday_open: "",
    sales_hours_tuesday_close: "",
    sales_hours_wednesday_open: "",
    sales_hours_wednesday_close: "",
    sales_hours_thursday_open: "",
    sales_hours_thursday_close: "",
    sales_hours_friday_open: "",
    sales_hours_friday_close: "",
    sales_hours_saturday_open: "",
    sales_hours_saturday_close: "",

    service_hours_sunday_open: "",
    service_hours_sunday_close: "",
    service_hours_monday_open: "",
    service_hours_monday_close: "",
    service_hours_tuesday_open: "",
    service_hours_tuesday_close: "",
    service_hours_wednesday_open: "",
    service_hours_wednesday_close: "",
    service_hours_thursday_open: "",
    service_hours_thursday_close: "",
    service_hours_friday_open: "",
    service_hours_friday_close: "",
    service_hours_saturday_open: "",
    service_hours_saturday_close: "",

    parts_hours_sunday_open: "",
    parts_hours_sunday_close: "",
    parts_hours_monday_open: "",
    parts_hours_monday_close: "",
    parts_hours_tuesday_open: "",
    parts_hours_tuesday_close: "",
    parts_hours_wednesday_open: "",
    parts_hours_wednesday_close: "",
    parts_hours_thursday_open: "",
    parts_hours_thursday_close: "",
    parts_hours_friday_open: "",
    parts_hours_friday_close: "",
    parts_hours_saturday_open: "",
    parts_hours_saturday_close: "",
    amenities: "",
    marketing_team: "",

    amenities_1: "false",
    amenities_2: "false",
    amenities_3: "false",
    amenities_4: "false",
    amenities_5: "false",
    amenities_6: "false",
    amenities_7: "false",
    amenities_8: "false",
    amenities_9: "false",
    amenities_10: "false",
    amenities_11: "false",
    amenities_12: "false",
    amenities_13: "false",
    amenities_14: "false",
    amenities_15: "false",
    amenities_16: "",
  });
  const [value, setValue] = useState("");
  const [other, setOther] = useState(false);
  const [otherAlert, setOtherAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dealership_bdc: event.target.value === "yes" ? 1 : 0,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    


    if (other && formData['amenities_16'] == "") {
      setOtherAlert(true);
      return;
    }



// NOTE  Validation to check amenities only select upto 7
   const checkedCount = Object.keys(formData)
  .filter((key) => key.startsWith('amenities_'))
  .reduce((count, key) => {
    if (key === 'amenities_16' && formData['amenities_16'] !== "") {
      return count + 1; // Increment count by 1 if amenities_16 is not blank
    }  if (formData[key] === 'true' && key !== 'amenities_16') {
      return count + 1; // Increment count for other checked amenities, excluding amenities_16
    }
    if (formData[key] === 'true' && key == 'amenities_16') {
      return count; // Increment count for other checked amenities, excluding amenities_16
    }
    return count; // No change if not checked or amenities_16 is blank or not true
  }, 0);
if (checkedCount > 7) {
  setShowAlert(true); 
  return;
}


// NOTE  Validation to check dealer_code and dealership_name exist else user not able to submit
    if (
      formData.dealer_code == "" ||
      formData.dealership_name == "" 
      // || formData.dealership_dba == ""
    )
     {return;} 


 

    // console.log(formData);
    fetch(`${backend_url}/update-dealer/${formData.dealer_code}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setShowSuccessAlert(true);
        return response.json();
       
      })
      .then((data) => {
      
        console.log("Data inserted successfully:", data);
        
        // console.log("hellow world",showSuccessAlert)

        // Optionally, reset form fields here
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };


  const handleOtherChange = (e) => {
    setOther(e.target.checked);
    if (!e.target.checked) {
      // Clear the value of amenities_16 when the "Other" checkbox is unchecked
      setFormData((prevFormData) => ({
        ...prevFormData,
        amenities_16: ""
      }));
    }
  };


  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedAmenities = formData.amenities;
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


  // NOTE  Make sure other checkbox option is checked if amenities_16 field have any value in it
  useEffect(() => {
    if (formData.amenities_16) {
      setOther(true);
    }
  }, [formData.amenities_16]);

  // Function to handle onBlur event
  const handleBlur = () => {
    // Fetch record from backend based on the dealer code
    fetchRecordFromBackend(formData.dealer_code);
    console.log(formData.dealer_code);
  };
  const fetchRecordFromBackend = (dealerCode) => {
    fetch(`${backend_url}/dealer-info/${dealerCode}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        const valueFromBackend =
          data.dealership_bdc.data[0] === 0 ? "no" : "yes";
        setValue(valueFromBackend);
     
        console.log(valueFromBackend);
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

          width: 750,
        }}
      >
        <p
          style={{
            textAlign: "left",
            fontSize: "20px",
            marginTop: "1rem",
            marginBottom: "1rem",

            color: "#176DB7",
            fontWeight: 400,
          }}
        >
          <a
            href="https://www.mercedesmax.com/"
            style={{
              textDecoration: "none",
              color: "#176DB7",
              fontWeight: 400,
              fontSize: "20px",
              fontFamily: "MBCorpoSText",
            }}
          >
            &lt; Back{" "}
          </a>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          width: 655,
        }}
      >
        <Box
          sx={{
            color: "#000",
            textAlign: "center",
            fontFamily: "MBCorpoATitleCondOffice",
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
            width: "531px",
            height: "101px",
            color: "#000",
            textAlign: "center",
            fontFamily: "MBCorpoSText-Light",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "300",
            marginBottom: "3%",
            lineHeight: "140%" /* 28px */,
          }}
        >
          Over the upcoming months, we will be sharing more and more details
          about the new MAX program, the new marketing channels, and how to
          optimize your marketing.
        </Box>
      </div>
      {/* SECTION FORM */}

      <div style={{ width: 600, margin: "0 auto" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit} // Handle form submission
          sx={{
            // border: "2px solid red",
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
              columnGap: "2rem",
              margin: "auto",
              justifyContent: "space-around",
              alignItems: "center",
              // border: "2px solid red",
              textAlign: "left",
            }}
          >
            <TextField
              id="dealer-code"
              label="Dealer Code *"
              variant="standard"
              sx={{
                color: "#666",
                fontFamily: "MBCorpoSText-Light",
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
              sx={{
                color: "#666",
                fontFamily: "MBCorpoSText-Light",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                // lineHeight: "140%" /* 22.4px */,
                textAlign: "left", // Specify the text alignment
              }}
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
              label="Dealership DBA"
              variant="standard"
              value={formData.dealership_dba}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dealership_dba: e.target.value,
                }))
              }
              sx={{ marginTop: 2, fontFamily: "MBCorpoSText-Light" }}
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
              marginTop: 4,
              // alignItems: "center",

              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            {" "}
            <p
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                alignItems: "start",
                textAlign: "left",
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
                fontFamily: "MBCorpoSText-Light",
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
                sx={{
                  width: "280px",
                  height: "0px",
                  flexShrink: 0,
                  fontFamily: "MBCorpoSText-Light",
                }}
                value={formData.dealership_city}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    dealership_city: e.target.value,
                  }))
                }
              />
              <FormControl
                variant="standard"
                sx={{ minWidth: 100, fontFamily: "MBCorpoSText-Light" }}
              >
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
                  <MenuItem
                    value=""
                    sx={{
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Select State
                  </MenuItem>
                  {Object.keys(StateCodes).map((stateName) => (
                    <MenuItem
                      key={stateName}
                      value={StateCodes[stateName]}
                      sx={{
                        fontFamily: "MBCorpoSText",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: "140%",
                        color: "#666",
                      }}
                    >
                      {stateName}
                    </MenuItem>
                  ))}
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
                sx={{ fontFamily: "MBCorpoSText-Light" }}
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
                sx={{
                  width: "280px",
                  marginTop: 2,
                  fontFamily: "MBCorpoSText-Light",
                }}
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
                sx={{
                  width: "280px",
                  marginTop: 2,
                  fontFamily: "MBCorpoSText-Light",
                }}
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
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="dealer_principal"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
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
                sx={{ width: "280px", fontFamily: "MBCorpoSText-Light" }}
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
                sx={{ width: "280px", fontFamily: "MBCorpoSText-Light" }}
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
                sx={{
                  width: "280px",
                  marginTop: 2,
                  fontFamily: "MBCorpoSText-Light",
                }}
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
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="general_sales_manager"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              General Sales Manager
            </p>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
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
                sx={{ marginTop: 2 }}
                value={formData.general_sales_mgr_email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    general_sales_mgr_email: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
          {/* General Service Manager */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="general_service_manager"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              General Service Manager
            </p>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
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
                sx={{ marginTop: 2 }}
                variant="standard"
                value={formData.general_service_mgr_email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    general_service_mgr_email: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>

          {/* Controller */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="controller"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              Controller
            </p>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
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
                sx={{ marginTop: 2 }}
                variant="standard"
                value={formData.controller_email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    controller_email: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>

          {/* Billing Contact */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            {" "}
            <p
              id="billing_contact"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              Billing Contact
            </p>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
              {" "}
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
                sx={{ marginTop: 2 }}
                variant="standard"
                value={formData.billing_contact_email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    billing_contact_email: e.target.value,
                  }))
                }
              />{" "}
            </Box>
          </Box>

          {/* Marketing Team */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="marketing_team"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              Marketing Team
            </p>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                columnGap: "10%",
                width: 268,
              }}
            >
              <FormControl variant="standard">
                <InputLabel id="marketing-team-label">Select One</InputLabel>
                <Select
                  labelId="marketing-team-label"
                  id="marketing-team"
                  label="Marketing Team"
                  variant="standard"
                  value={formData.marketing_team}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      marketing_team: e.target.value,
                    }))
                  }
                >
                  <MenuItem
                    value="in_house"
                    sx={{
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    In-House
                  </MenuItem>
                  <MenuItem
                    value="outside_agency"
                    sx={{
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Outside Agency
                  </MenuItem>
                  <MenuItem
                    value="none"
                    sx={{
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    None
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Marketing Contact */}

          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              id="marketing_contact"
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
              }}
            >
              Marketing Contact
            </p>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
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
                sx={{ marginTop: 2 }}
                variant="standard"
                value={formData.marketing_contact_email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    marketing_contact_email: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>

          {/* DMS Provider */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "10%",
              }}
            >
              <TextField
                id="dms_provider"
                sx={{
                  fontFamily: "MBCorpoSText",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "140%",
                  color: "#666",
                }}
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
                    marketing_contact_service_scheduler_provider:
                      e.target.value,
                  }))
                }
              />
            </Box>
          </Box>

          {/* BDC */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "5fr 2fr",
                // columnGap: "14%",
              }}
            >
              {/* <FormControl component="fieldset" > */}
              <FormLabel
                component="legend"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: "flex",
                  fontFamily: "MBCorpoSText",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "140%",
                  color: "#666",
                }}
              >
                Does your dealership have an established BDC?
              </FormLabel>
              <RadioGroup
                sx={{ textAlign: "right" }}
                aria-label="bdc"
                name="bdc"
                value={value}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                  sx={{
                    fontFamily: "MBCorpoSText",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "140%",
                    color: "#666",
                  }}
                />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {/* </FormControl> */}
            </Box>
          </Box>
          {/* <sales hours> */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "4%",
                rowGap: "3%",
              }}
            >
              <div
                style={{ borderRight: "1px solid #D9D9D9", paddingRight: 14 }}
              >
                <p
                  style={{
                    color: "#000",
                    fontFamily: '"MBCorpoATextCond"',
                    fontSize: "32px",
                    // border: "2px solid red",
                    fontStyle: "normal",
                    fontWeight: "400",
                    display: "flex",
                    // margin: "auto",
                    // alignItems: "start",
                    textAlign: "left",
                  }}
                >
                  Sales Hours
                </p>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 3,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sun:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {/* Custom clock icon */}

                    {/* Original input */}
                    <Input
                      type="time"
                      id="sales_hours_sunday_open"
                      name="sales_hours_sunday_open"
                      value={formData.sales_hours_sunday_open}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sales_hours_sunday_open: e.target.value,
                        })
                      }
                      required
                      sx={{
                        fontSize: 14,
                        fontFamily: "MBCorpoSText",
                        lineHeight: "140%",
                        color: "#666",
                        fontWeight: 400,
                      }}
                    />
                  </div>

                  {/* <Input
                    type="time"
                    id="sales_hours_sunday_open"
                    name="sales_hours_sunday_open"
                    value={formData.sales_hours_sunday_open}
                    required
                    sx={{ fontSize: 14,fontFamily: "MBCorpoSText", lineHeight: "140%",
                    color: "#666",fontWeight: 400, }}
                  /> */}
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_sunday_close"
                    name="sales_hours_sunday_close"
                    value={formData.sales_hours_sunday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_sunday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Mon:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_monday_open"
                    name="sales_hours_monday_open"
                    value={formData.sales_hours_monday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_monday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_monday_close"
                    name="sales_hours_monday_close"
                    value={formData.sales_hours_monday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_monday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Tues:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_tuesday_open"
                    name="sales_hours_tuesday_open"
                    value={formData.sales_hours_tuesday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_tuesday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_tuesday_close"
                    name="sales_hours_tuesday_close"
                    value={formData.sales_hours_tuesday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_tuesday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Wed:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_wednesday_open"
                    name="sales_hours_wednesday_open"
                    value={formData.sales_hours_wednesday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_wednesday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_wednesday_close"
                    name="sales_hours_wednesday_close"
                    value={formData.sales_hours_wednesday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_wednesday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Thur:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_thursday_open"
                    name="sales_hours_thursday_open"
                    value={formData.sales_hours_thursday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_thursday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_thursday_close"
                    name="sales_hours_thursday_close"
                    value={formData.sales_hours_thursday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_thursday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Fri:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_friday_open"
                    name="sales_hours_friday_open"
                    value={formData.sales_hours_friday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_friday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_friday_close"
                    name="sales_hours_friday_close"
                    value={formData.sales_hours_friday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_friday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sat:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_saturday_open"
                    name="sales_hours_saturday_open"
                    value={formData.sales_hours_saturday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_saturday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="sales_hours_saturday_close"
                    name="sales_hours_saturday_close"
                    value={formData.sales_hours_saturday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sales_hours_saturday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
              </div>
              <div
                style={{ borderRight: "1px solid #D9D9D9", paddingRight: 14 }}
              >
                <p
                  style={{
                    color: "#000",
                    fontFamily: '"MBCorpoATextCond"',
                    fontSize: "32px",
                    // border: "2px solid red",
                    fontStyle: "normal",
                    fontWeight: "400",
                    display: "flex",

                    // margin: "auto",
                    // alignItems: "start",
                    textAlign: "left",
                  }}
                >
                  Service Hours
                </p>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 3,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sun:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_sunday_open"
                    name="service_hours_sunday_open"
                    value={formData.service_hours_sunday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_sunday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_sunday_close"
                    name="service_hours_sunday_close"
                    value={formData.service_hours_sunday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_sunday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Mon:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_monday_open"
                    name="service_hours_monday_open"
                    value={formData.service_hours_monday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_monday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_monday_close"
                    name="service_hours_monday_close"
                    value={formData.service_hours_monday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_monday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Tues:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_tuesday_open"
                    name="service_hours_tuesday_open"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_tuesday_open: e.target.value,
                      })
                    }
                    value={formData.service_hours_tuesday_open}
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_tuesday_close"
                    name="service_hours_tuesday_close"
                    value={formData.service_hours_tuesday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_tuesday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Wed:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_wednesday_open"
                    name="service_hours_wednesday_open"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_wednesday_open: e.target.value,
                      })
                    }
                    value={formData.service_hours_wednesday_open}
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_wednesday_close"
                    name="service_hours_wednesday_close"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_wednesday_close: e.target.value,
                      })
                    }
                    value={formData.service_hours_wednesday_close}
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Thur:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_thursday_open"
                    name="service_hours_thursday_open"
                    value={formData.service_hours_thursday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_thursday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_thursday_close"
                    name="service_hours_thursday_close"
                    value={formData.service_hours_thursday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_thursday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Fri:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_friday_open"
                    name="service_hours_friday_open"
                    value={formData.service_hours_friday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_friday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_friday_close"
                    name="service_hours_friday_close"
                    value={formData.service_hours_friday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_friday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sat:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_saturday_open"
                    name="service_hours_saturday_open"
                    value={formData.service_hours_saturday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_saturday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="service_hours_saturday_close"
                    name="service_hours_saturday_close"
                    value={formData.service_hours_saturday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_hours_saturday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
              </div>

              <div>
                <p
                  style={{
                    color: "#000",
                    fontFamily: '"MBCorpoATextCond"',
                    fontSize: "32px",
                    // border: "2px solid red",
                    fontStyle: "normal",
                    fontWeight: "400",
                    display: "flex",
                    // margin: "auto",
                    // alignItems: "start",
                    textAlign: "left",
                  }}
                >
                  Parts Hours
                </p>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 3,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sun:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_sunday_open"
                    name="parts_hours_sunday_open"
                    value={formData.parts_hours_sunday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_sunday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_sunday_close"
                    name="parts_hours_sunday_close"
                    value={formData.parts_hours_sunday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_sunday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Mon:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_monday_open"
                    name="parts_hours_monday_open"
                    value={formData.parts_hours_monday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_monday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_monday_close"
                    name="parts_hours_monday_close"
                    value={formData.parts_hours_monday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_monday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Tues:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_tuesday_open"
                    name="parts_hours_tuesday_open"
                    value={formData.parts_hours_tuesday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_tuesday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_tuesday_close"
                    name="parts_hours_tuesday_close"
                    value={formData.parts_hours_tuesday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_tuesday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Wed:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_wednesday_open"
                    name="parts_hours_wednesday_open"
                    value={formData.parts_hours_wednesday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_wednesday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_wednesday_close"
                    name="parts_hours_wednesday_close"
                    value={formData.parts_hours_wednesday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_wednesday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Thur:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_thursday_open"
                    name="parts_hours_thursday_open"
                    value={formData.parts_hours_thursday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_thursday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_thursday_close"
                    name="parts_hours_thursday_close"
                    value={formData.parts_hours_thursday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_thursday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Fri:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_friday_open"
                    name="parts_hours_friday_open"
                    value={formData.parts_hours_friday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_friday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_friday_close"
                    name="parts_hours_friday_close"
                    value={formData.parts_hours_friday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_friday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      fontWeight: 700,
                      paddingTop: 2,
                      marginTop: "4%",
                      fontFamily: "MBCorpoSText",
                      fontSize: 16,
                      lineHeight: "140%",
                      color: "#666",
                    }}
                  >
                    Sat:
                  </label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    open:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_saturday_open"
                    name="parts_hours_saturday_open"
                    value={formData.parts_hours_saturday_open}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_saturday_open: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    // columnGap: "2%",
                    rowGap: "3%",
                  }}
                >
                  <label></label>
                  <label
                    for="appt"
                    style={{
                      fontSize: 13,
                      paddingTop: 5,
                      fontFamily: "MBCorpoSText",
                    }}
                  >
                    close:
                  </label>

                  <Input
                    type="time"
                    id="parts_hours_saturday_close"
                    name="parts_hours_saturday_close"
                    value={formData.parts_hours_saturday_close}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parts_hours_saturday_close: e.target.value,
                      })
                    }
                    required
                    sx={{
                      fontSize: 14,
                      fontFamily: "MBCorpoSText",
                      lineHeight: "140%",
                      color: "#666",
                      fontWeight: 400,
                    }}
                  />
                </Box>
              </div>
            </Box>
          </Box>

          {/* FIXME Need to send array */}
          <Box
            as="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",

              margin: "auto",
              justifyContent: "left",
              marginTop: 4,
              // alignItems: "center",
              // border: "2px solid green",
              textAlign: "left",
            }}
          >
            <p
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                textAlign: "left",
              }}
            >
              Amenities
            </p>
            <span
              style={{
                color: "#000",
                fontFamily: '"MBCorpoATextCond"',
                fontSize: "16px",
                // border: "2px solid red",
                fontStyle: "normal",
                fontWeight: "400",
                display: "flex",
                // margin: "auto",
                // alignItems: "start",
                textAlign: "left",
                marginBottom: "3%",
              }}
            >
              Select up to 7
            </span>

           

           

            {showAlert&&<Alert severity="error"  onClose={() => setShowAlert(false)}>Only select up to 7 amenities.</Alert>}
            
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "3%",
                // rowGap:"3%"
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    // onChange={handleCheckboxChange}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_1: e.target.checked ? "true" : "false",
                      })
                    }
                    // value={formData.amenities_1}
                    checked={formData.amenities_1 === "true"}
                    name="amenities_1"
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 33, paddingTop: 0 },
                    }}
                  />
                }
                label="Complimentary Wash and Vacuum with Service"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_2: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_2 === "true"}
                    name="amenities_2"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Multi-Point Inspection"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_3: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_3 === "true"}
                    name="amenities_3"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary High Speed WiFi"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_4: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_4 === "true"}
                    name="amenities_4"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Express Service"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_5: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_5 === "true"}
                    name="amenities_5"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Pickup/Delivery"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_6: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_6 === "true"}
                    name="amenities_6"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Mobile Service"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_7: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_7 === "true"}
                    name="amenities_7"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Shuttle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_8: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_8 === "true"}
                    name="amenities_8"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Guest Lounge w/ Workstations & Outdoor Patio"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_9: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_9 === "true"}
                    name="amenities_9"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Mercedes-Benz Loaner"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_10: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_10 === "true"}
                    name="amenities_10"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Onsite Café with Fresh Food and Starbucks Drinks"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_11: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_11 === "true"}
                    name="amenities_11"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Early Morning & After Hours Drop-off"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_12: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_12 === "true"}
                    name="amenities_12"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Coffee & Bottled Water"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_13: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_13 === "true"}
                    name="amenities_13"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Online Bill Payment Options"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_14: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_14 === "true"}
                    name="amenities_14"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 33 } }}
                  />
                }
                label="Complimentary Electric Vehicle Charging Stations"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amenities_15: e.target.checked ? "true" : "false",
                      })
                    }
                    checked={formData.amenities_15 === "true"}
                    name="amenities_15"
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 33, paddingTop: 0 },
                    }}
                  />
                }
                label="FlexPay"
              />



<div><FormControlLabel
                control={
                  <Checkbox
                  onChange={handleOtherChange}
                    checked={other}
                    name="other"
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 33, paddingTop: 0 },
                    }}
                  />
                }
                label="Other"
              />

              </div>
              
            </Box>
            {other && (
                <TextField
                  id="amenities_16"
                  label="Other"
                  variant="standard"
                  sx={{ marginBottom:"3%", width:"50%", marginLeft:"52%" }}
                  value={formData.amenities_16}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      amenities_16: e.target.value,
                    }))
                  }
                />
              )}
          </Box>


          {otherAlert && (
  <Alert severity="error" onClose={() => setOtherAlert(false)} sx={{ marginTop: "3%", marginBottom:"3%"}}>
    After checking the "Other" box, the input box cannot be left blank.
  </Alert>
)}
  
  
         
          {showSuccessAlert && (
  <Alert severity="success" onClose={() => setShowSuccessAlert(false)} sx={{ marginTop: "3%", marginBottom:"3%"}}>
    Data inserted successfully!
  </Alert>
)}

          <Button
            type="submit"
            className="submitbutton"
            sx={{
              backgroundColor: "#176DB7",
              borderRadius: 0,
              color: "#fff",
             paddingRight:"50px",
             paddingLeft:"50px",
             marginTop:"30px",
              fontFamily: "MBCorpoSText",
              fontWeight: 700,
             
             
              
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </div>
    </>
  );
};

export default MBMaxRegistration;
