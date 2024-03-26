import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { updateGateway } from "api/gateways";
import Card from "components/card";
import Checkbox from "components/checkbox";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { MdEdit, MdInfo } from "react-icons/md";
import React, { useEffect, useRef } from "react";
import cardTypes from "./cardTypes";
import { MultiSelect } from "react-multi-select-component";

const CreatePaymentMethoddModal = ({
  fetchUsers,
  id,
  is_info,
  data,
  roleData,
  timeZone,
  allCardType,
}: {
  fetchUsers: () => void;
  id?: string;
  is_info?: boolean;
  data?: any;
  roleData?: any;
  timeZone?: any;
  allCardType?: any;
}) => {
  const rootFormdata = {
    Sipe: {
      name: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      business_name: "",
      app_id: "",
      body: "",
      key: "",
      merchant_id: "",
      nonce_string: "",
      notify_url: "",
      timezone: "",
    },
    Stripe: {
      name: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      secret_key: "",
      statement_descriptor: "",
      statement_descriptor_suffix: "",
      timezone: "",
    },
    Pix: {
      name: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      business_name: "",
      subscription_key: "",
      timezone: "",
    },
    Blumon: {
      name: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      business_name: "",
      password: "",
      username: "",
      timezone: "",
    },
    pixlotus: {
      name: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      authorization_name: "",
      base_url: "",
      subscription_key: "",
      timezone: "",
    },
    Memphis: {
      name: "",
      tkr_test: "",
      commerce_name_test: "",
      commerce_id_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    Raypd: {
      name: "",
      secret_key_test: "",
      access_key_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    Banwire: {
      name: "",
      username_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    Valitor: {
      name: "",
      apikey_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    Bambora: {
      name: "",
      merchantId_test: "",
      passcode_test: "",
      hash_key_test: "",

      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    reSet: {
      name: "",
      secretKey_test: "",
      brand_id_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    MIT: {
      name: "",
      id_branch_test: "",
      id_company_test: "",
      merchant_id_test: "",
      password_test: "",
      user_code_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    Scipiopay: {
      name: "",
      shop_id_test: "",
      shop_secret_key_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    "Aurea Via": {
      name: "",
      companyNum_test: "",
      personalHashkey_test: "",
      // shop_secret_key_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    "Betapay": {
      name: "",
      api_token_test: "",
      merchant_id_test: "",
      terminal_id_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
    "Kasha": {
      name: "",
      api_key_test: "",
      merchant_domain_test: "",
      payments: false,
      authorization: false,
      subscription: false,
      payout: false,
      refund: false,
      direct_debit: false,
      payin: false,
      token: false,
      is_active: false,
      timezone: "",
    },
  };

  const rootForm =
    id === "Sipe"
      ? rootFormdata?.Sipe
      : id === "Stripe"
        ? rootFormdata?.Stripe
        : id === "Pix"
          ? rootFormdata?.Pix
          : id === "Blumon"
            ? rootFormdata?.Blumon
            : id === "pixlotus"
              ? rootFormdata?.pixlotus
              : id === "Memphis"
                ? rootFormdata?.Memphis
                : id === "Raypd"
                  ? rootFormdata?.Raypd
                  : id === "Banwire"
                    ? rootFormdata?.Banwire
                    : id === "Valitor"
                      ? rootFormdata?.Valitor
                      : id === "Bambora"
                        ? rootFormdata?.Bambora
                        : id === "MIT"
                          ? rootFormdata?.MIT
                          : id === "Scipiopay"
                            ? rootFormdata?.Scipiopay
                            : id === "Aurea Via"
                              ? rootFormdata["Aurea Via"]
                              : id === "Betapay"
                                ? rootFormdata?.Betapay
                                : id === "Kasha"
                                  ? rootFormdata?.Kasha
                                  : null;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [viewMode, setViewMode] = React.useState<boolean>(is_info);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);
  const [showCards, setShowCards] = React.useState<boolean>(false);
  const [checkedCards, setCheckedCards] = React.useState<any[]>([]);
  const [isFormInitialized, setIsFormInitialized] = React.useState(false);

  //console.log("allCardType", timeZone);
  const initForm = () => {
    if (data && !isFormInitialized) {

      const newFormValues =
        data?.name === "Pix"
          ? {
            name: data?.name,
            payments: data?.payments,
            authorization: data?.authorization,
            subscription: data?.subscription,
            card_types: data?.card_types,
            payout: data?.payout,
            refund: data?.refund,
            apm: data?.apm,
            direct_debit: data?.direct_debit,
            payin: data?.payin,
            token: data?.token,
            is_active: data?.is_active,
            timezone: data?.timezone,
            id: data?.id,
            subscription_key: data?.meta_info?.subscription_key,
            business_name: data?.meta_info?.business_name,
          }
          : data?.name === "Pix-Lotus"
            ? {
              name: data?.name,
              payments: data?.payments,
              authorization: data?.authorization,
              subscription: data?.subscription,
              card_types: data?.card_types,
              payout: data?.payout,
              refund: data?.refund,
              apm: data?.apm,
              direct_debit: data?.direct_debit,
              payin: data?.payin,
              token: data?.token,
              is_active: data?.is_active,
              timezone: data?.timezone,
              id: data?.id,
              authorization_name: data?.meta_info?.authorization,
              base_url: data?.meta_info?.base_url,
              subscription_key: data?.meta_info?.subscription_key,
            }
            : data?.name === "Blumon"
              ? {
                name: data?.name,
                payments: data?.payments,
                authorization: data?.authorization,
                subscription: data?.subscription,
                card_types: data?.card_types,
                payout: data?.payout,
                refund: data?.refund,
                apm: data?.apm,

                direct_debit: data?.direct_debit,
                payin: data?.payin,
                token: data?.token,
                is_active: data?.is_active,
                timezone: data?.timezone,
                id: data?.id,
                username: data?.meta_info?.username,
                password: data?.meta_info?.password,
                business_name: data?.meta_info?.business_name,
              }
              : data?.name === "Stripe"
                ? {
                  name: data?.name,
                  payments: data?.payments,
                  authorization: data?.authorization,
                  subscription: data?.subscription,
                  card_types: data?.card_types,
                  payout: data?.payout,
                  refund: data?.refund,
                  apm: data?.apm,

                  direct_debit: data?.direct_debit,
                  payin: data?.payin,
                  token: data?.token,
                  is_active: data?.is_active,
                  timezone: data?.timezone,
                  id: data?.id,
                  secret_key: data?.meta_info?.secret_key,
                  statement_descriptor_suffix:
                    data?.meta_info?.statement_descriptor_suffix,
                  statement_descriptor: data?.meta_info?.statement_descriptor,
                }
                : data?.name === "Sipe"
                  ? {
                    name: data?.name,
                    payments: data?.payments,
                    authorization: data?.authorization,
                    subscription: data?.subscription,
                    card_types: data?.card_types,
                    payout: data?.payout,
                    refund: data?.refund,
                    apm: data?.apm,

                    direct_debit: data?.direct_debit,
                    payin: data?.payin,
                    token: data?.token,
                    is_active: data?.is_active,
                    timezone: data?.timezone,
                    id: data?.id,
                    business_name: data?.meta_info?.business_name,
                    app_id: data?.meta_info?.app_id,
                    body: data?.meta_info?.body,
                    key: data?.meta_info?.key,
                    merchant_id: data?.meta_info?.merchant_id,
                    nonce_string: data?.meta_info?.nonce_string,
                    notify_url: data?.meta_info?.notify_url,
                  }
                  : data?.name === "Memphis"
                    ? {
                      name: data?.name,
                      tkr_test: data?.meta_info?.tkr_test,
                      commerce_name_test: data?.meta_info?.commerce_name_test,
                      commerce_id_test: data?.meta_info?.commerce_id_test,
                      payments: data?.payments,
                      authorization: data?.authorization,
                      subscription: data?.subscription,
                      card_types: data?.card_types,
                      payout: data?.payout,
                      refund: data?.refund,
                      apm: data?.apm,

                      direct_debit: data?.direct_debit,
                      payin: data?.payin,
                      token: data?.token,
                      is_active: data?.is_active,
                      timezone: data?.timezone,
                      id: data?.id,
                    }
                    : data?.name === "Raypd"
                      ? {
                        name: data?.name,
                        id: data?.id,
                        is_active: data?.is_active,
                        timezone: data?.timezone,
                        payments: data?.payments,
                        authorization: data?.authorization,
                        subscription: data?.subscription,
                        card_types: data?.card_types,
                        payout: data?.payout,
                        refund: data?.refund,
                        apm: data?.apm,

                        direct_debit: data?.direct_debit,
                        payin: data?.payin,
                        token: data?.token,
                        access_key_test: data?.meta_info?.access_key_test,
                        secret_key_test: data?.meta_info?.secret_key_test,
                      }
                      : data?.name === "Banwire"
                        ? {
                          name: data?.name,
                          id: data?.id,
                          is_active: data?.is_active,
                          timezone: data?.timezone,
                          payments: data?.payments,
                          authorization: data?.authorization,
                          subscription: data?.subscription,
                          card_types: data?.card_types,
                          payout: data?.payout,
                          refund: data?.refund,
                          apm: data?.apm,

                          direct_debit: data?.direct_debit,
                          payin: data?.payin,
                          token: data?.token,
                          username_test: data?.meta_info?.username_test,

                        }
                        : data?.name === "Valitor"
                          ? {
                            name: data?.name,
                            id: data?.id,
                            is_active: data?.is_active,
                            timezone: data?.timezone,
                            payments: data?.payments,
                            authorization: data?.authorization,
                            subscription: data?.subscription,
                            card_types: data?.card_types,
                            payout: data?.payout,
                            refund: data?.refund,
                            apm: data?.apm,

                            direct_debit: data?.direct_debit,
                            payin: data?.payin,
                            token: data?.token,
                            apikey_test: data?.meta_info?.apikey_test,

                          }
                          : data?.name === "Bambora"
                            ? {
                              name: data?.name,
                              id: data?.id,
                              is_active: data?.is_active,
                              timezone: data?.timezone,
                              payments: data?.payments,
                              authorization: data?.authorization,
                              subscription: data?.subscription,
                              card_types: data?.card_types,
                              payout: data?.payout,
                              refund: data?.refund,
                              apm: data?.apm,

                              direct_debit: data?.direct_debit,
                              payin: data?.payin,
                              token: data?.token,
                              merchantId_test: data?.meta_info?.merchantId_test,
                              passcode_test: data?.meta_info?.passcode_test,
                              hash_key_test: data?.meta_info?.hash_key_test,


                            }
                            : data?.name === "Re-set"
                              ? {
                                name: data?.name,
                                id: data?.id,
                                is_active: data?.is_active,
                                timezone: data?.timezone,
                                payments: data?.payments,
                                authorization: data?.authorization,
                                subscription: data?.subscription,
                                card_types: data?.card_types,
                                payout: data?.payout,
                                refund: data?.refund,
                                apm: data?.apm,

                                direct_debit: data?.direct_debit,
                                payin: data?.payin,
                                token: data?.token,
                                secretKey_test: data?.meta_info?.secretKey_test,
                                brand_id_test: data?.meta_info?.brand_id_test,

                              }
                              : data?.name === "MIT"
                                ? {
                                  name: data?.name,
                                  id: data?.id,
                                  is_active: data?.is_active,
                                  timezone: data?.timezone,
                                  payments: data?.payments,
                                  authorization: data?.authorization,
                                  subscription: data?.subscription,
                                  card_types: data?.card_types,
                                  payout: data?.payout,
                                  refund: data?.refund,
                                  apm: data?.apm,

                                  direct_debit: data?.direct_debit,
                                  payin: data?.payin,
                                  token: data?.token,
                                  id_branch_test: data?.meta_info?.id_branch_test,
                                  id_company_test: data?.meta_info?.id_company_test,
                                  merchant_id_test: data?.meta_info?.merchant_id_test,
                                  password_test: data?.meta_info?.password_test,
                                  user_code_test: data?.meta_info?.user_code_test,
                                }
                                : data?.name === "Scipiopay" ?
                                  {
                                    name: data?.name,
                                    id: data?.id,
                                    is_active: data?.is_active,
                                    timezone: data?.timezone,
                                    payments: data?.payments,
                                    authorization: data?.authorization,
                                    subscription: data?.subscription,
                                    card_types: data?.card_types,
                                    payout: data?.payout,
                                    refund: data?.refund,
                                    apm: data?.apm,

                                    direct_debit: data?.direct_debit,
                                    payin: data?.payin,
                                    token: data?.token,
                                    shop_id_test: data?.meta_info?.shop_id_test,
                                    shop_secret_key_test: data?.meta_info?.shop_secret_key_test,
                                  }
                                  : data?.name === "Aurea Via" ?
                                    {
                                      name: data?.name,
                                      id: data?.id,
                                      is_active: data?.is_active,
                                      timezone: data?.timezone,
                                      payments: data?.payments,
                                      authorization: data?.authorization,
                                      subscription: data?.subscription,
                                      card_types: data?.card_types,
                                      payout: data?.payout,
                                      refund: data?.refund,
                                      apm: data?.apm,

                                      direct_debit: data?.direct_debit,
                                      payin: data?.payin,
                                      token: data?.token,
                                      companyNum_test: data?.meta_info?.companyNum_test,
                                      personalHashkey_test: data?.meta_info?.personalHashkey_test,
                                    }
                                    : data?.name === "Betapay" ?
                                      {
                                        name: data?.name,
                                        id: data?.id,
                                        is_active: data?.is_active,
                                        timezone: data?.timezone,
                                        payments: data?.payments,
                                        authorization: data?.authorization,
                                        subscription: data?.subscription,
                                        card_types: data?.card_types,
                                        payout: data?.payout,
                                        refund: data?.refund,
                                        apm: data?.apm,

                                        direct_debit: data?.direct_debit,
                                        payin: data?.payin,
                                        token: data?.token,
                                        api_token_test: data?.meta_info?.api_token_test,
                                        merchant_id_test: data?.meta_info?.merchant_id_test,
                                        terminal_id_test: data?.meta_info?.terminal_id_test,
                                      } :
                                      data?.name === "Kasha" ?
                                        {
                                          name: data?.name,
                                          id: data?.id,
                                          is_active: data?.is_active,
                                          timezone: data?.timezone,
                                          payments: data?.payments,
                                          authorization: data?.authorization,
                                          subscription: data?.subscription,
                                          card_types: data?.card_types,
                                          payout: data?.payout,
                                          refund: data?.refund,
                                          apm: data?.apm,

                                          direct_debit: data?.direct_debit,
                                          payin: data?.payin,
                                          token: data?.token,
                                          api_key_test: data?.meta_info?.api_key_test,
                                          merchant_domain_test: data?.meta_info?.merchant_domain_test,
                                        }
                                        : {
                                          name: data?.name,
                                          payments: data?.payments,
                                          authorization: data?.authorization,
                                          subscription: data?.subscription,
                                          card_types: data?.card_types,
                                          payout: data?.payout,
                                          refund: data?.refund,
                                          apm: data?.apm,

                                          direct_debit: data?.direct_debit,
                                          payin: data?.payin,
                                          token: data?.token,
                                          is_active: data?.is_active,
                                          timezone: data?.timezone,
                                          id: data?.id,
                                        };
      setFormValues(newFormValues);


      //showCardTypes();

    }

  };

  const updateCheckedCards = () => {
    // console.log("formValues?.card_types", formValues?.card_types)

    // setCheckedCards(formValues?.card_types);

    const formatCardValues = formValues?.card_types?.map((item: any) => {
      return {
        label: item,
        value: item
      }
    })
    setCheckedCards(formatCardValues);
    setIsFormInitialized(true);
  }

  React.useEffect(() => {
    initForm();
  }, [data, isFormInitialized]);

  React.useEffect(() => {
    updateCheckedCards();
  }, [formValues]);

  //console.log("checkedCards",checkedCards);


  const handleClose = () => {
    fetchUsers();
    setFormValues(rootForm);
    setFormValuesErr(rootForm);
    onClose();
  };

  const showCardTypes = () => {
    let arr = ['refund', 'payments', 'subscription'];


    const isAnyCheckboxChecked = arr.some((id) => {
      const checkbox = document.getElementById(id) as HTMLInputElement | null;
      return checkbox ? checkbox.checked : false;
    });
    //console.log("checkBox2",isAnyCheckboxChecked,"checkBox2");
    return setShowCards(isAnyCheckboxChecked);
  };

  function handleValueChange(e: any) {
    setFormValues({
      ...formValues,
      [e.target.id]:
        e.target.value === "true"
          ? true
          : e.target.value === "false"
            ? false
            : e.target.value,
    });

    showCardTypes();
    //console.log("checkBox",showCards,"checkBox");
    setFormValuesErr({ ...formValuesErr, [e.target.id]: "" });
  }

  const handleCardChange = (event: any) => {
    const cardType = event
    // console.log("cardType", cardType)
    setCheckedCards(cardType)

    // setCheckedCards((prevSelected = []) => {


    //   const updatedSelected = prevSelected.includes(cardType)
    //     ? prevSelected.filter((type) => type !== cardType)
    //     : [...prevSelected, cardType];


    //   return updatedSelected;
    // });
    // setCheckedCards((prevSelected = []) => {


    //   const updatedSelected = prevSelected.includes(cardType)
    //     ? prevSelected.filter((type) => type !== cardType)
    //     : [...prevSelected, cardType];
    //   return updatedSelected;
    // });

  };



  //console.log("CheckedCards",formValues);

  function validateData() {
    let escape_arr = [
      "statement_descriptor",
      "statement_descriptor_suffix",
      "business_name",
    ];

    let verifier: any;
    Object.keys(formValues).forEach((key: any) => {
      let temp_arr = escape_arr.filter((ele) => key === ele);

      if (!(temp_arr?.length > 0)) {
        if (!formValues[key as keyof any]) {
          verifier = { ...verifier, [key]: "Please enter a value" };
        }
      }
    });



    setFormValuesErr(verifier);

    const hasEmptyValues = Object.entries(formValues).some(([key, value]) => {
      let temp_arr_ = escape_arr.filter((ele) => key === ele);
      if (!(temp_arr_?.length > 0)) {
        return value === "";
      }
    });
    if (hasEmptyValues) {
      return false;
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    let validate = validateData();
    if (formValues?.is_active ? validate : true) {
      try {
        setIsLoading(true);
        var data: any = {
          name: formValues?.name,
          payments: formValues.payments,
          authorization: formValues.authorization,
          subscription: formValues.subscription,
          payout: formValues.payout,
          refund: formValues.refund,
          apm: formValues.apm,
          direct_debit: formValues.direct_debit,
          payin: formValues?.payin,
          token: formValues?.token,
          is_active: formValues?.is_active,
          timezone: formValues?.timezone,
          card_types: checkedCards?.map((item: any) => item?.value),
          id: formValues?.id,
          meta_info: {
            business_name: formValues?.business_name,
            subscription_key: formValues?.subscription_key,
            base_url: formValues?.base_url,
            authorization: formValues?.authorization_name,
            password: formValues?.password,
            username: formValues?.username,
            statement_descriptor: formValues?.statement_descriptor,
            statement_descriptor_suffix:
              formValues?.statement_descriptor_suffix,
            secret_key: formValues?.secret_key,
            app_id: formValues?.app_id,
            body: formValues?.body,
            key: formValues?.key,
            merchant_id: formValues?.merchant_id,
            nonce_string: formValues?.nonce_string,
            notify_url: formValues?.notify_url,
            tkr_test: formValues?.tkr_test,
            commerce_name_test: formValues?.commerce_name_test,
            commerce_id_test: formValues?.commerce_id_test,
            id_branch_test: formValues?.id_branch_test,
            id_company_test: formValues?.id_company_test,
            merchant_id_test: formValues?.merchant_id_test,
            password_test: formValues?.password_test,
            user_code_test: formValues?.user_code_test,
            secret_key_test: formValues?.secret_key_test,
            access_key_test: formValues?.access_key_test,
            username_test: formValues?.username_test,
            apikey_test: formValues?.apikey_test,
            secretKey_test: formValues?.secretKey_test,
            brand_id_test: formValues?.brand_id_test,
            merchantId_test: formValues?.merchantId_test,
            passcode_test: formValues?.passcode_test,
            shop_id_test: formValues?.shop_id_test,
            shop_secret_key_test: formValues?.shop_secret_key_test,
            companyNum_test: formValues?.companyNum_test,
            personalHashkey_test: formValues?.personalHashkey_test,
            hash_key_test: formValues?.hash_key_test,
            api_token_test: formValues?.api_token_test,
            // merchant_id_test: formValues?.merchant_id_test,
            terminal_id_test: formValues?.terminal_id_test,
            api_key_test: formValues?.api_key_test,
            merchant_domain_test: formValues?.merchant_domain_test
          },
        };
        const data1: any = {
          is_active: formValues?.is_active,
          id: formValues?.id,
        };

        //console.log("formvalue",formValues); return;
        await updateGateway(formValues?.is_active ? data : data1);

        fetchUsers();
        handleClose();
      } catch (err: any) {
        if (err?.response?.status === 422) {
          toast.error("Please provide valid values");
        } else {
          toast.error(err?.response?.data?.message ?? "Unable save user data");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }



  useEffect(() => {
    //setSelectedCardTypes(dataFromDB);
  }, []);




  return (
    <>
      <div
        onClick={() => {
          if (data) {
            initForm();
          }
          onOpen();
        }}
      >
        {is_info ? (
          <MdInfo
            className="h-5 w-5 cursor-pointer text-indigo-500"
            title="View"
          />
        ) : id ? (
          roleData?.[0]?.payment_method?.value?.edit_payment_method && (
            <MdEdit
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="Edit"
            />
          )
        ) : //   <Card extra="w-fit px-5 cursor-pointer">
          //     <button className="flex items-center justify-center gap-2 whitespace-nowrap p-5 text-navy-700 outline-none dark:text-gray-200">
          //       <BsPlusCircle className="h-5 w-5" /> Add Payment Method
          //     </button>
          //   </Card>
          null}
      </div>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />

        {/* <ModalContent className="!z-[1002] !m-auto !w-max md:min-w-[800px] !max-w-[85%] md:top-[12vh]"> */}
        {/* <ModalContent className="!z-[1002] !m-auto sm:my-8 sm:w-full  sm:max-w-lg !m-3 lg:max-w-3xl sm:top-[11vh]"> */}
        {/* <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004]"> */}

        <ModalContent className="z-[1002] !m-auto   sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-start  min-h-[85vh] max-h-[100vh] overflow-auto scrollbarhide ">
          <ModalBody className="py-2">

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004] ">

              <h1 className="p-5 px-[30px] text-2xl font-bold">
                {is_info
                  ? "View"
                  : id
                    ? "Update Gateway Info "
                    : "Create Gateway"}
              </h1>
              {is_info && (
                <MdEdit
                  className="absolute right-7 top-10 h-6 w-6 cursor-pointer text-indigo-500"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                />
              )}
              {/* <div className="md:max-h-[calc(100vh-300px)] max-h-[calc(100vh-200px)]   overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              <div className="px-[35px]">

                <div className="w-full">
                  <div className="mt-5 flex gap-8">
                    <div className="flex gap-2">
                      <label
                        className={`ml-1.5 mr-3 text-base font-bold text-navy-700 dark:text-white`}
                      >
                        Id : {formValues?.id}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="mt-5 flex gap-8">
                    <div className="flex gap-2">
                      <label
                        className={`ml-1.5 mr-3 text-sm font-bold text-navy-700 dark:text-white text-gray-900 `}
                      >
                        Status
                      </label>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <select
                      id="is_active"
                      value={formValues?.is_active}
                      onChange={handleValueChange}
                      className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border  bg-white/0 p-3 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mt-5 flex gap-8">
                    <div className="flex gap-2">
                      <label
                        className={`ml-1.5 mr-3 text-sm font-bold text-navy-700 dark:text-white text-gray-900`}
                      >
                        Timezone
                      </label>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <select
                      id="timezone"
                      name="timezone"
                      value={formValues?.timezone}
                      onChange={handleValueChange}
                      className="mt-1 flex h-10 w-full items-center justify-center rounded-xl border  bg-white/0 p-2 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    >
                      <option value="">Select TimeZone</option>
                      {timeZone?.map((data: any,index:any) => {
                        return (
                          <option
                          key={index}
                            value={data?.label}
                          >{`${data?.label}(${data?.value})`}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* <div className="flex h-full w-full items-center gap-4"> */}
                <div className="flex h-full w-full items-center gap-4 overflow-x-auto">
                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white">
                        Payment
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="payments"
                          value={!formValues?.payments}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.payments == null
                          }
                          className={`${formValues?.payments == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.payments == null ? "gray" : ""}

                          checked={formValues?.payments}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        Refund
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="refund"
                          value={!formValues?.refund}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.refund == null
                          }
                          className={`${formValues?.refund == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.refund == null ? "gray" : ""}
                          checked={formValues?.refund}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        APM
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="apm"
                          value={!formValues?.apm}
                          disabled={
                            formValues?.is_active === false ? true : false
                              || formValues?.apm == null
                          }
                          className={`${formValues?.apm == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.apm == null ? "gray" : ""}
                          checked={formValues?.apm}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white">
                        Authorization
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="authorization"
                          value={!formValues?.authorization}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.authorization == null
                          }
                          className={`${formValues?.authorization == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.authorization == null ? "gray" : ""}
                          checked={formValues?.authorization}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white">
                        Subscription
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="subscription"
                          value={!formValues?.subscription}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.subscription == null
                          }
                          className={`${formValues?.subscription == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.subscription == null ? "gray" : ""}
                          checked={formValues?.subscription}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        Token
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="token"
                          value={!formValues?.token}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.token == null
                          }
                          className={`${formValues?.token == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}
                          color={formValues?.is_active === false || formValues?.token == null ? "gray" : ""}
                          checked={formValues?.token}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        Payout
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="payout"
                          value={!formValues?.payout}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.payout == null
                          }
                          className={`${formValues?.payout == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}

                          color={formValues?.is_active === false || formValues?.payout == null ? "gray" : ""}
                          checked={formValues?.payout}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        Direct Debit
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="direct_debit"
                          value={!formValues?.direct_debit}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.direct_debit == null
                          }
                          className={`${formValues?.direct_debit == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}
                          color={formValues?.is_active === false || formValues?.direct_debit == null ? "gray" : ""}
                          checked={formValues?.direct_debit}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className=" flex items-center justify-between p-2">
                    <div className="">
                      <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                        Payin
                      </p>
                      <div className="flex justify-center">
                        <Checkbox
                          id="payin"
                          value={!formValues?.payin}
                          disabled={
                            formValues?.is_active === false ? true : false || formValues?.payin == null
                          }
                          className={`${formValues?.payin == null ? "dark:bg-gray-700 w-5 h-5" : "w-5 h-5"}`}
                          color={formValues?.is_active === false || formValues?.payin == null ? "gray" : ""}
                          checked={formValues?.payin}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="h-4 w-full">
                  <div className="mt-5 flex gap-8">
                    <label
                      className={`ml-1.5 mr-3 text-2xl font-bold text-navy-700 dark:text-white`}
                    >
                      Card types
                    </label>
                  </div>
                </div>
                <div className=" flex items-center justify-between p-2 mt-5">
                  {/* {false && allCardType?.map((item: any) => {
                    return (


                      <div className="">
                        <p className="mb-1 text-sm font-medium text-navy-700 dark:text-white  ">
                          {item}
                        </p>
                        <div className="flex justify-center">
                          <Checkbox
                            id={item}
                            value={item}
                            disabled={false}
                            checked={checkedCards?.includes(item)}
                            onChange={handleCardChange}
                          />
                        </div>
                      </div>

                    );
                  })} */}

                  {/* {console.log("allCardType", allCardType)} */}
                  <div className="mb-2 mt-2 text-sm text-navy-700 dark:text-white"
                    style={{ minWidth: "100%" }}
                  >

                    <MultiSelect
                      options={allCardType?.map((item: any) => {
                        return {
                          label: item,
                          value: item
                        }
                      })}
                      value={checkedCards}
                      onChange={handleCardChange}
                      labelledBy={"Select"}
                      isCreatable={true}
                      disabled={viewMode}
                    />
                  </div>
                </div>
                <div className="h-4 w-full">
                  <div className="mt-5 flex gap-8">
                    <label
                      className={`ml-1.5 mr-3 text-2xl font-bold text-navy-700 dark:text-white`}
                    >
                      Test Credentials
                    </label>
                  </div>
                </div>

                {formValues?.name && (
                  <div className="mt-5 max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">
                    {formValues?.name === "Sipe" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Business Name"
                          placeholder="Google inc."
                          id="business_name"
                          type="text"
                          value={formValues?.business_name ?? ""}
                          state={formValuesErr?.business_name ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Key*"
                          placeholder=""
                          id="key"
                          type="text"
                          value={formValues?.key ?? ""}
                          state={formValuesErr?.key ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Merchant ID*"
                          placeholder="Google inc."
                          id="merchant_id"
                          type="text"
                          value={formValues?.merchant_id ?? ""}
                          state={formValuesErr?.merchant_id ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="App ID*"
                          placeholder="Google inc."
                          id="app_id"
                          type="text"
                          value={formValues?.app_id ?? ""}
                          state={formValuesErr?.app_id ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Nonce Str*"
                          placeholder="Google inc."
                          id="nonce_string"
                          type="text"
                          value={formValues?.nonce_string ?? ""}
                          state={formValuesErr?.nonce_string ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Body*"
                          placeholder="Google inc."
                          id="body"
                          type="text"
                          value={formValues?.body ?? ""}
                          state={formValuesErr?.body ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Notify URL*"
                          placeholder=""
                          id="notify_url"
                          type="text"
                          value={formValues?.notify_url ?? ""}
                          state={formValuesErr?.notify_url ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Blumon" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Business Name"
                          placeholder="Google inc."
                          id="business_name"
                          type="text"
                          value={formValues?.business_name ?? ""}
                          state={formValuesErr?.business_name ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Username*"
                          placeholder="Username"
                          id="username"
                          type="text"
                          value={formValues?.username ?? ""}
                          state={formValuesErr?.username ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Password*"
                          placeholder="********"
                          id="password"
                          type="password"
                          value={formValues?.password ?? ""}
                          state={formValuesErr?.password ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Stripe" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Secret Key*"
                          placeholder="Secret key"
                          id="secret_key"
                          type="text"
                          value={formValues?.secret_key ?? ""}
                          state={formValuesErr?.secret_key ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <div className="mt-3 flex w-full gap-3">
                          <InputField
                            disabled={
                              formValues?.is_active === false ? true : false
                            }
                            variant="auth"
                            extra="mb-1 w-full"
                            label="Statement Descriptor"
                            placeholder="Custom descriptor"
                            id="statement_descriptor"
                            type="text"
                            value={formValues?.statement_descriptor ?? ""}
                            state={
                              formValuesErr?.statement_descriptor ? "error" : ""
                            }
                            onChange={handleValueChange}
                          />
                          <InputField
                            disabled={
                              formValues?.is_active === false ? true : false
                            }
                            variant="auth"
                            extra="mb-1 w-full"
                            label="Statement Descriptor Suffix"
                            placeholder="Custom descriptor suffix"
                            id="statement_descriptor_suffix"
                            type="text"
                            value={
                              formValues?.statement_descriptor_suffix ?? ""
                            }
                            state={
                              formValuesErr?.statement_descriptor_suffix
                                ? "error"
                                : ""
                            }
                            onChange={handleValueChange}
                          />
                        </div>
                      </>
                    )}
                    {formValues?.name === "Pix-Lotus" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Subscription key*"
                          placeholder=""
                          id="subscription_key"
                          type="text"
                          value={formValues?.subscription_key ?? ""}
                          state={formValuesErr?.subscription_key ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1 w-full"
                          label="Authorization"
                          placeholder=""
                          id="authorization_name"
                          type="text"
                          value={formValues?.authorization_name ?? ""}
                          state={
                            formValuesErr?.authorization_name ? "error" : ""
                          }
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1 w-full"
                          label="Base URL"
                          placeholder=""
                          id="base_url"
                          type="text"
                          value={formValues?.base_url ?? ""}
                          state={formValuesErr?.base_url ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Pix" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Business Name"
                          placeholder="Google inc."
                          id="business_name"
                          type="text"
                          value={formValues?.business_name ?? ""}
                          state={formValuesErr?.business_name ? "error" : ""}
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Subscription key*"
                          placeholder="Subscription key"
                          id="subscription_key"
                          type="text"
                          value={formValues.subscription_key ?? ""}
                          state={formValuesErr?.subscription_key ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Memphis" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Commerce Id*"
                          placeholder="Commerce Id"
                          id="commerce_id_test"
                          type="text"
                          value={formValues?.commerce_id_test ?? ""}
                          state={formValuesErr?.commerce_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Commerce Name*"
                          placeholder="Commerce Name"
                          id="commerce_name_test"
                          type="text"
                          value={formValues?.commerce_name_test ?? ""}
                          state={
                            formValuesErr?.commerce_name_test ? "error" : ""
                          }
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="TKR*"
                          placeholder="TKR"
                          id="tkr_test"
                          type="text"
                          value={formValues?.tkr_test ?? ""}
                          state={formValuesErr?.tkr_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}

                    {formValues?.name === "Raypd" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Secret Key*"
                          placeholder="Secret key"
                          id="secret_key_test"
                          type="text"
                          value={formValues?.secret_key_test ?? ""}
                          state={formValuesErr?.secret_key_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Access Key*"
                          placeholder="Access key"
                          id="access_key_test"
                          type="text"
                          value={formValues?.access_key_test ?? ""}
                          state={formValuesErr?.access_key_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Banwire" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Username*"
                          placeholder="Username"
                          id="username_test"
                          type="text"
                          value={formValues?.username_test ?? ""}
                          state={formValuesErr?.username_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                      </>
                    )}
                    {formValues?.name === "Valitor" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="API Key*"
                          placeholder="API Key"
                          id="apikey_test"
                          type="text"
                          value={formValues?.apikey_test ?? ""}
                          state={formValuesErr?.apikey_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                      </>
                    )}
                    {formValues?.name === "Bambora" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Merchant Id*"
                          placeholder="Merchant Id"
                          id="merchantId_test"
                          type="text"
                          value={formValues?.merchantId_test ?? ""}
                          state={formValuesErr?.merchantId_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Passcode*"
                          placeholder="Passcode"
                          id="passcode_test"
                          type="text"
                          value={formValues?.passcode_test ?? ""}
                          state={formValuesErr?.passcode_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Hash Key Test*"
                          placeholder="Hash key test"
                          id="hash_key_test"
                          type="text"
                          value={formValues?.hash_key_test ?? ""}
                          state={formValuesErr?.hash_key_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                      </>
                    )}
                    {formValues?.name === "Re-set" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Secret Key*"
                          placeholder="Secret Key"
                          id="secretKey_test"
                          type="text"
                          value={formValues?.secretKey_test ?? ""}
                          state={formValuesErr?.secretKey_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Brand ID*"
                          placeholder="Brand ID"
                          id="brand_id_test"
                          type="text"
                          value={formValues?.brand_id_test ?? ""}
                          state={formValuesErr?.brand_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "MIT" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Id Branch*"
                          placeholder="Id Branch"
                          id="id_branch_test"
                          type="text"
                          value={formValues?.id_branch_test ?? ""}
                          state={formValuesErr?.id_branch_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Id Company*"
                          placeholder="Id Company"
                          id="id_company_test"
                          type="text"
                          value={formValues?.id_company_test ?? ""}
                          state={formValuesErr?.id_company_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Merchant ID*"
                          placeholder="Google inc."
                          id="merchant_id_test"
                          type="text"
                          value={formValues?.merchant_id_test ?? ""}
                          state={formValuesErr?.merchant_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Password*"
                          placeholder="********"
                          id="password_test"
                          type="password"
                          value={formValues?.password_test ?? ""}
                          state={formValuesErr?.password_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="User Code*"
                          placeholder="User Code"
                          id="user_code_test"
                          type="text"
                          value={formValues?.user_code_test ?? ""}
                          state={formValuesErr?.user_code_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                      </>
                    )}
                    {formValues?.name === "Scipiopay" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Shop Id*"
                          placeholder="Shop Id"
                          id="shop_id_test"
                          type="text"
                          value={formValues?.shop_id_test ?? ""}
                          state={formValuesErr?.shop_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Shop Secret Key*"
                          placeholder="Shop secret key test"
                          id="shop_secret_key_test"
                          type="text"
                          value={formValues?.shop_secret_key_test ?? ""}
                          state={formValuesErr?.shop_secret_key_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                      </>
                    )}

                    {formValues?.name === "Aurea Via" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Company Number*"
                          placeholder="Company number"
                          id="companyNum_test"
                          type="text"
                          value={formValues?.companyNum_test ?? ""}
                          state={formValuesErr?.companyNum_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Personal Hash key*"
                          placeholder="Personal hash key"
                          id="personalHashkey_test"
                          type="text"
                          value={formValues?.personalHashkey_test ?? ""}
                          state={formValuesErr?.personalHashkey_test ? "error" : ""}
                          onChange={handleValueChange}
                        />





                      </>
                    )}
                    {formValues?.name === "Betapay" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Api Token*"
                          placeholder="Api token"
                          id="api_token_test"
                          type="text"
                          value={formValues?.api_token_test ?? ""}
                          state={formValuesErr?.api_token_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Merchant Id*"
                          placeholder="Merchant id "
                          id="merchant_id_test"
                          type="text"
                          value={formValues?.merchant_id_test ?? ""}
                          state={formValuesErr?.merchant_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Terminal Id*"
                          placeholder="Terminal id"
                          id="terminal_id_test"
                          type="text"
                          value={formValues?.terminal_id_test ?? ""}
                          state={formValuesErr?.terminal_id_test ? "error" : ""}
                          onChange={handleValueChange}
                        />


                      </>
                    )}
                    {formValues?.name === "Kasha" && (
                      <>
                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Api Key*"
                          placeholder="Api Key"
                          id="api_key_test"
                          type="text"
                          value={formValues?.api_key_test ?? ""}
                          state={formValuesErr?.api_key_test ? "error" : ""}
                          onChange={handleValueChange}
                        />

                        <InputField
                          disabled={
                            formValues?.is_active === false ? true : false
                          }
                          variant="auth"
                          extra="mb-1"
                          label="Merchant Domain Test*"
                          placeholder="Merchant domain test"
                          id="merchant_domain_test"
                          type="text"
                          value={formValues?.merchant_domain_test ?? ""}
                          state={formValuesErr?.merchant_domain_test ? "error" : ""}
                          onChange={handleValueChange}
                        />





                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-5 flex gap-2 px-[30px] pb-[30px]">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  //   disabled={viewMode}
                  disabled={id ? false : true}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal >
    </>
  );
};
export default CreatePaymentMethoddModal;
