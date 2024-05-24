import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Backdrop,
  Container,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Product from "../Product";
import { useAppDispatch } from "../../store/store";
import { createOrder } from "../../features/order/orderActions";
import useLocalStorage from "../../store/useLocalStorage";
import { DraggableItemType, StoneType } from "../../types/types";
import { createProduct } from "../../features/product/productActions";
import ShareButton from "../../shared-components/ShareButton";
import { createPayment } from "../../features/payment/paymentActions";
import { useSearchParams } from "react-router-dom";
import SuccessDialog from "../../shared-components/SuccessDialog";

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  deliveryLocationName: string;
  deliveryNumber: string;
  deliveryTime: string;
}

interface CheckAndOrderPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const CheckAndOrderPage: React.FC<CheckAndOrderPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const dispatch = useAppDispatch();
  const [selectedStone] = useLocalStorage<StoneType>("selectedStone");
  const [currentPrice] = useLocalStorage<number>("currentPrice");
  const [items] = useLocalStorage<DraggableItemType[]>("items");
  const [fFirstName] = useLocalStorage<string>("fFirstName");
  const [fLastName] = useLocalStorage<string>("fLastName");
  const [fDateOnPlate] = useLocalStorage<string>("fDateOnPlate");
  const [fBirthdayOnPlate] = useLocalStorage<string>("fBirthdayOnPlate");
  const [productId, setProductId] = useLocalStorage<string>("productId");
  const [open, setOpen] = useState<boolean>(
    status === "success" || status === "cancel"
  );
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(
    status === "success"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (!productId && !isLoading) {
      setIsLoading(true);
      const droppedSymbols = items?.map((item) => {
        return {
          position: {
            x: item.position.x * 2,
            y: item.position.y * 2,
          },
          symbol: item.symbol,
        };
      });
      const productInfo = {
        stoneId: selectedStone ? selectedStone._id : "",
        droppedSymbols:
          window.innerWidth < 600 ? droppedSymbols : items ? items : [],
        firstName: fFirstName ? fFirstName : "",
        lastName: fLastName ? fLastName : "",
        dateOnPlate: fDateOnPlate ? fDateOnPlate : "",
        birthdayOnPlate: fBirthdayOnPlate ? fBirthdayOnPlate : "",
        price: currentPrice ? currentPrice : 0,
      };
      const createProductAsync = async () => {
        const resultAction = await dispatch(
          createProduct(productInfo)
        ).unwrap();
        if (resultAction && resultAction._id) {
          setProductId(resultAction._id);
        }
        setIsLoading(false);
      };
      createProductAsync();
    }
  }, [
    dispatch,
    selectedStone,
    items,
    fFirstName,
    fLastName,
    fDateOnPlate,
    fBirthdayOnPlate,
    currentPrice,
    productId,
    setProductId,
    isLoading,
  ]);

  useEffect(() => {
    // Load form data from local storage if available
    const formDataString = localStorage.getItem("formData");
    if (formDataString) {
      const formData = JSON.parse(formDataString) as FormValues;
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          setValue(key as keyof FormValues, formData[key as keyof FormValues]);
        }
      }
    }
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    if (!productId || !termsAccepted) {
      setShowError(true);
      return;
    }

    localStorage.setItem("formData", JSON.stringify(data));
    setIsLoading(true);

    const response = await dispatch(
      createPayment({ productId, price: currentPrice || 0, email: data.email })
    );
    const payload = response.payload as { href?: string };

    if (payload.href) {
      window.location.href = payload.href;
    } else {
      console.error("Error: href property is missing in the response payload");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "success" && productId) {
      const formDataString = localStorage.getItem("formData");
      if (formDataString) {
        const formData = JSON.parse(formDataString) as FormValues;

        const createOrderAsync = async () => {
          const orderData = {
            subscriberInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              phoneNumber: formData.phoneNumber,
              email: formData.email,
            },
            deliveryInfo: {
              address: formData.deliveryAddress,
              locationName: formData.deliveryLocationName,
              deliveryNumber: formData.deliveryNumber,
              deliveryTime: formData.deliveryTime,
            },
            productId: productId,
          };
          await dispatch(createOrder(orderData));
          localStorage.removeItem("formData");
          localStorage.removeItem("fFirstName");
          localStorage.removeItem("fLastName");
          localStorage.removeItem("fDateOnPlate");
          localStorage.removeItem("fBirthdayOnPlate");
          localStorage.removeItem("currentPrice");
          setIsPaymentSuccessful(true);
          setIsLoading(false);
        };

        createOrderAsync();
      }
    }
  }, [status, productId, dispatch]);

  const onPrevious = () => {
    localStorage.removeItem("productId");
    onNavigatePrevious();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    if (event.target.checked) {
      setShowError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
        <Container maxWidth={"lg"}>
          <Grid
            container
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
          >
            <Grid
              container
              item
              sm={12}
              md={5}
              order={{ xs: 2, md: 1 }}
              justifyContent={"center"}
            >
              <Grid item>
                <Typography variant="h6" className="text-center">
                  Tilaajan tiedot
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                spacing={1}
                justifyContent={"center"}
              >
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Nimi"
                    variant="outlined"
                    {...register("firstName", { required: true })}
                    error={!!errors.firstName}
                    helperText={errors.firstName ? "Etunimi on pakollinen" : ""}
                    className="w-full"
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Sukunimi"
                    variant="outlined"
                    {...register("lastName", { required: true })}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? "Sukunimi on pakollinen" : ""}
                    className="w-full"
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Puhelinnmero"
                    variant="outlined"
                    {...register("phoneNumber", { required: true })}
                    error={!!errors.phoneNumber}
                    helperText={
                      errors.phoneNumber ? "Puhelinnumero on pakollinen" : ""
                    }
                    className="w-full"
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Sähköpostiosoite"
                    variant="outlined"
                    {...register("email", { required: true })}
                    error={!!errors.email}
                    helperText={
                      errors.email ? "Sähköpostiosoite on pakollinen" : ""
                    }
                    className="w-full"
                  />
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="h6" className="text-center">
                  Toimitustiedot
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                spacing={1}
                justifyContent={"center"}
              >
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Toimitusosoite"
                    variant="outlined"
                    {...register("deliveryAddress", { required: true })}
                    error={!!errors.deliveryAddress}
                    helperText={
                      errors.deliveryAddress
                        ? "Toimitusosoite on pakollinen"
                        : ""
                    }
                    className="w-full"
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Toimituspaikan nimi"
                    variant="outlined"
                    {...register("deliveryLocationName")}
                    className="w-full"
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Toimitusnumero"
                    variant="outlined"
                    className="w-full"
                    {...register("deliveryNumber")}
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    label="Toivottu toimitusajankohta"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    {...register("deliveryTime")}
                    className="w-full"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              md={7}
              order={{ xs: 1, md: 2 }}
              direction={"column"}
              alignItems={"center"}
              spacing={2}
            >
              <Product
                selectedStone={selectedStone}
                items={items}
                firstName={fFirstName}
                lastName={fLastName}
                dateOnPlate={fDateOnPlate}
                birthdayOnPlate={fBirthdayOnPlate}
              />
              <Grid item>
                <Typography variant="subtitle1">
                  Nykyinen hinta: €{currentPrice}
                </Typography>
              </Grid>
              <Grid item>
                <ShareButton
                  shareUrl={window.location.origin + "/product/" + productId}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" alignItems="center" mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleCheckboxChange}
                  name="termsAccepted"
                  color="primary"
                />
              }
              label={
                <>
                  Hyväksyn{" "}
                  <Link
                    href="/toimitus-ja-maksuehdot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    toimitus- ja maksuehdot
                  </Link>
                </>
              }
            />
            {showError && !termsAccepted && (
              <Typography color="error">
                Please accept the terms and conditions to proceed.
              </Typography>
            )}
          </Grid>
          <Grid container justifyContent="center">
            <Button
              type="button"
              variant="contained"
              onClick={onPrevious}
              className="!mr-5 !mt-10"
            >
              Edellinen
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!mr-5 !mt-10"
            >
              Maksa Nyt
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              disabled={!isPaymentSuccessful}
              onClick={onNavigateNext}
              className="!mr-5 !mt-10"
            >
              Seuraava
            </Button>
          </Grid>
        </Container>
      </form>
      <Backdrop open={isLoading} style={{ zIndex: 1201 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SuccessDialog
        open={open}
        onClose={handleClose}
        message={status ? status : ""}
      />
    </>
  );
};

export default CheckAndOrderPage;
