import { useEffect, useState } from "react";
import { convertCurrency, getCurrencyList } from "../../APIs/Currency.api";
import {
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Modal } from "..";
import "./Form.css";

const Form = (): JSX.Element => {
  const [dropdownData, setDropdownData] = useState([]);
  const [error, setError] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({
    source_currency: "",
    target_currency: "",
    amount: "",
    source_currency_label: "",
    target_currency_label: "",
  });
  const [convertedAmount, setConvertedAmount] = useState("");

  const fetchData = async () => {
    const response = await getCurrencyList({});

    if (response.data.status !== 200) {
      setError(response.data.message);
    }

    const newResponse = response.data.payload.map((item: any) => {
      return { label: item.name, value: item.value };
    });

    setDropdownData(newResponse);
    setLoading(false);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setButtonLoading(true);
    const response = await convertCurrency(data);

    if (response.data.status === 200) {
      setConvertedAmount(
        `${data.amount} ${data.source_currency_label} = ${response.data.payload.convertedAmount} ${data.target_currency_label}`
      );
      setData({
        source_currency: "",
        target_currency: "",
        amount: "",
        source_currency_label: "",
        target_currency_label: "",
      });
      setOpenModal(true);
    } else {
      setError(response.data.message);
      setOpenAlert(true);
    }

    setButtonLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="main">
      {error && (
        <Snackbar
          open={openAlert}
          onClose={handleClose}
          autoHideDuration={5000}
          className="w_full"
        >
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <div className="container">
        {loading && <CircularProgress className="loadingContainer" />}
        <div className={loading ? "loadingForm" : "container"}>
          <h1 className="heading">Currency Converter</h1>
          <form onSubmit={handleSubmit} className="formContainer">
            <Autocomplete
              options={dropdownData}
              id="source-currency"
              renderInput={(params) => {
                return <TextField {...params} label="From" required />;
              }}
              onChange={(_event: any, item: any) => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    source_currency: item.value,
                    source_currency_label: item.label,
                  };
                });
              }}
              className="w_full"
              value={data.source_currency_label}
              disabled={loading || buttonLoading}
            />
            <TextField
              required
              placeholder="Enter Amount"
              label="Amount"
              className="w_full"
              onChange={(item: any) =>
                setData((prev: any) => {
                  return { ...prev, amount: item.target.value };
                })
              }
              value={data.amount}
              disabled={loading || buttonLoading}
            />
            <Autocomplete
              options={dropdownData}
              id="target-currency"
              renderInput={(params) => (
                <TextField {...params} label="To" required />
              )}
              className="w_full"
              onChange={(event: any, item: any) => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    target_currency: item.value,
                    target_currency_label: item.label,
                  };
                });
              }}
              value={data.target_currency_label}
              disabled={loading || buttonLoading}
            />
            <Button
              aria-label="Convert"
              variant="contained"
              endIcon={
                buttonLoading ? (
                  <CircularProgress
                    color="primary"
                    style={{ height: "32px", width: "32px", marginLeft: "5px" }}
                  />
                ) : (
                  <ImportExportIcon />
                )
              }
              type="submit"
              className="w_full"
              disabled={buttonLoading || loading}
            >
              Convert
            </Button>
          </form>
        </div>
      </div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        heading="💵 Currency Conversion 💵"
        description={convertedAmount}
      />
    </section>
  );
};

export { Form };
