import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/modal";
import { createClientGateway, getGatewayForClient, verifyWalletAddress } from "api/client-gateways";
import { getAllGateways, getAllGatewaysByClient } from "api/gateways";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react';
import sipe from "assets/img/payment-clients/sipe.png";
import pixLotus from "assets/img/payment-clients/pix.png";
import pix from "assets/img/payment-clients/pix.png";
import blumon from "assets/img/payment-clients/blumon.png";
import stripe from "assets/img/payment-clients/stripe.png";
import memphis from "assets/img/payment-clients/memphis.png";

import repyd from "assets/img/payment-clients/rapyd.png";
import mit from "assets/img/payment-clients/mit.png";
import banwire from "assets/img/payment-clients/banwire.jpg";
import valitor from "assets/img/payment-clients/valitor.png";
import bambora from "assets/img/payment-clients/bambora.png";
import Scipiopay from "assets/img/payment-clients/Scipiopay.png";
import Aurea_via from "assets/img/payment-clients/Aurea_via.png";
import Betapay from "assets/img/payment-clients/Betapay.png";
import Kasha from "assets/img/payment-clients/Kasha.jpg";
import reSet from "assets/img/payment-clients/reset.png";
import { getCurrencySymbol, currencyCodes } from 'utils/currencyList'; // Adjust the path if needed


import Card from "components/card";

import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { MdIntegrationInstructions } from "react-icons/md";
import DeleteClientGatewayModal from "./DeleteClientGatewayModal";
import ShortTruncateCopy from "components/common/ShortTruncateCopy";

import GatewayPricing from "./GatewayPricing";
import BankInfo from "./BankInfo";
import WalletAddress from "./WalletAddress";
import Radio from "components/radio";


import { ClientContext } from "clientProvider";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'
import { IoEyeOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Checkbox from "components/checkbox";
// import { Dropdown } from 'primereact/dropdown';
// import 'primereact/resources/themes/lara-light-cyan/theme.css';
// import { Link } from "react-router-dom";
import { getProfile } from "api/users";
// import Select from 'react-dropdown-select';
import { Select as AntSelect } from 'antd';
import Image from "next/image";
import Link from "next/link";



interface iGateway {
  client_id?: string;
  id?: string;
  name: string;
  inputs: any;
  image: string;
  to_convert?: any,
  new_currency?: any
  reserved_pricing?: any,
  settlement?: any


}

export const GatewayTypes: iGateway[] = [
  {
    client_id: "",
    id: "",
    name: "Stripe",
    inputs: {
      secret_key_live: "",
      secret_key_test: "",
      statement_descriptor: "",
      statement_descriptor_suffix: "",
      is_live: false,
    },
    to_convert: "",
    new_currency: "",
    image: stripe,
  },
  {
    client_id: "",
    id: "",
    name: "Sipe",
    inputs: {
      key: "",
      business_name: "",
      merchant_id: "",
      app_id: "",
      nonce_string: "",
      body: "",
      notify_url: "",
      base_url: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: sipe,
  },
  {
    client_id: "",
    id: "",
    name: "Blumon",

    inputs: {
      business_name: "",
      username: "",
      password: "",
      base_url: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: blumon,
  },
  {
    client_id: "",
    id: "",
    name: "Pix-Lotus",
    inputs: {
      subscription_key: "",
      authorization: "",
      base_url: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: pixLotus,
  },
  {
    client_id: "",
    id: "",
    name: "Re-set",
    inputs: {
      secretKey_test: "",
      secretKey_live: "",
      brand_id_test: "",
      brand_id_live: "",
      base_url: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: reSet,
  },
  {
    client_id: "",
    id: "",
    name: "Pix",
    inputs: {
      business_name: "",
      subscription_key_live: "",
      subscription_key_test: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: pix,
  },
  {
    client_id: "",
    id: "",
    name: "Memphis",
    inputs: {
      business_name: "",
      subscription_key_live: "",
      subscription_key_test: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: memphis,
  },
  {
    client_id: "",
    id: "",
    name: "Raypd",
    inputs: {
      access_key_live: "",
      access_key_test: "",
      secret_key_live: "",
      secret_key_test: "",
      // to_convert: false,
      // new_currency: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: repyd,
  },
  {
    client_id: "",
    id: "",
    name: "MIT",
    inputs: {
      id_company_live: "",
      id_company_test: "",
      id_branch_live: "",
      id_branch_test: "",
      user_code_live: "",
      user_code_test: "",
      password_live: "",
      password_test: "",
      merchant_id_live: "",
      merchant_id_test: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: mit,
  },
  {
    client_id: "",
    id: "",
    name: "Banwire",
    inputs: {
      username_live: "",
      username_test: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: banwire,
  },
  {
    client_id: "",
    id: "",
    name: "Valitor",
    inputs: {
      apikey_live: "",
      apikey_test: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: valitor,
  },
  {
    client_id: "",
    id: "",
    name: "Bambora",
    inputs: {
      merchantId_test: "",
      merchantId_live: "",
      passcode_test: "",
      passcode_live: "",
      hash_key_test: "",
      hash_key_live: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: bambora,
  },
  {
    client_id: "",
    id: "",
    name: "Scipiopay",
    inputs: {
      shop_id_test: "",
      shop_id_live: "",
      // merchantId_live: "",
      shop_secret_key_test: "",
      shop_secret_key_live: "",
      // passcode_live: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: Scipiopay,
  },
  {
    client_id: "",
    id: "",
    name: "Aurea Via",
    inputs: {
      companyNum_test: "",
      companyNum_live: "",
      personalHashkey_test: "",
      personalHashkey_live: "",

      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: Aurea_via,
  },
  {
    client_id: "",
    id: "",
    name: "Betapay",
    inputs: {
      api_token_test: "",
      api_token_live: "",
      merchant_id_test: "",
      merchant_id_live: "",
      terminal_id_test: "",
      terminal_id_live: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: Betapay,
  },
  {
    client_id: "",
    id: "",
    name: "Kasha",
    inputs: {
      api_key_test: "",
      api_key_live: "",
      merchant_domain_test: "",
      merchant_domain_live: "",
      is_live: false,
      descriptor: "",
    },
    to_convert: "",
    new_currency: "",
    image: Betapay,
  },
];

const CreateClientGatewaysModal = ({
  id,
  fetchClients,
  assigned_payment_methods
}: {
  id: string;
  fetchClients: () => void;
  assigned_payment_methods?: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [type, setType] = useState<string>();
  const [hashID, setHashID] = useState<string>();
  const [formValues, setFormValues] = useState<any>({});
  const [addedgateways, setAddedGateways] = useState<iGateway[]>(GatewayTypes);
  const [gatewayTypes, setGatewayTypes] = useState<any[]>([]);
  const [formValuesErr, setFormValuesErr] = useState<any>();
  const [toggleBtn, setToggleBtn] = useState<any>(false);
  const [user, setUser] = useState("Jesse Hall");
  const [storeGetwayId, setStoreGateWayId] = useState();
  const [passwordShow, setPasswordShow] = useState(false);
  const [transSelect, setTransSelect] = useState();
  const [reseSelect, setReseSelect] = useState();
  const [bankInfoCount, setBankInfoCount] = useState<number>(1);
  const [walletCount, setWalletCount] = useState<number>(1);
  const { singleRoleData, setSingleRoleData } = useContext(ClientContext);
  const [methodName, setMethodName] = useState<boolean>(false);
  const [pricingRight, setPricingRight] = useState<boolean>(false);
  const [settelmentRight, setSettelmentRight] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [currencyConv, setCurrencyConv] = useState<string>("requestPassthrough");

  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [isOpenWalletAddress, setIsOpenWalletAddress] = useState<boolean>(false);
  const [addNewWallet, setAddNewWallet] = useState<any>([]);
  const [descardWallet, setDescardWallet] = useState<any>([]);
  const [wallertVerifyIput, setWallertVerifyIput] = useState<any>({});



  const currencyOptions = currencyCodes.map((currencyCode) => {
    const currencyDetails = getCurrencySymbol(currencyCode);
    return (
      <option key={currencyCode} value={currencyCode}>
        {currencyDetails && `${currencyDetails.country_icon}:${currencyDetails.title}`}
      </option>
    );
  });

  const handleCurrencySelect = (event: any) => {
    // console.log("event.target.value", event.target.value)
    setSelectedCurrency(event);
  };

  // var DropDownId: any = document.getElementsByClassName('p-dropdown-panel');

  // // When the user clicks anywhere outside of the modal, close it
  // window.addEventListener("onclick", function (event: any) {
  //   if (event.target == DropDownId) {
  //     DropDownId?.style?.display = "none";
  //   }
  // })


  console.log("formValuessss", formValues)
  useEffect(() => {
    const method = singleRoleData[0]?.client?.value?.client_show_method_name;
    const pricing_right = singleRoleData[0]?.client?.value?.client_gateway_pricing;
    const settelment_right = singleRoleData[0]?.client?.value?.client_gateway_settlement;
    setPricingRight(pricing_right)
    setSettelmentRight(settelment_right)
    setMethodName(method);

    //console.log("methodName",methodName);
    let saved_form_inputs = addedgateways.filter((data) => data?.name === type);
    let saved_form_inputs_test = gatewayTypes?.filter(
      (data) => data?.name === type
    )?.[0]?.meta_info;

    let saved_form_CardTypes = gatewayTypes?.filter(
      (data) => data?.name === type
    )?.[0]?.card_types;

    let saved_form_fees_details_test = gatewayTypes?.filter(
      (data) => data?.name === type
    )

    console.log("saved_form_fees_details_test", saved_form_fees_details_test)

    let newSavedInput =
      saved_form_inputs &&
      saved_form_inputs.length > 0 &&
      saved_form_inputs?.map((item: any) => {
        const value = item?.is_live;

        const clonedObject =
          type === "Stripe"
            ? {
              ...item?.inputs,
              is_live: value === undefined ? false : value,
              secret_key_test: item?.inputs?.secret_key_test
                ? item?.inputs?.secret_key_test
                : saved_form_inputs_test?.secret_key,
              secret_key_live: item?.inputs?.secret_key_live
                ? item?.inputs?.secret_key_live
                : "",
              statement_descriptor_suffix: item?.inputs
                ?.statement_descriptor_suffix
                ? item?.inputs?.statement_descriptor_suffix
                : saved_form_inputs_test?.statement_descriptor_suffix,
              statement_descriptor: item?.inputs?.statement_descriptor
                ? item?.inputs?.statement_descriptor
                : saved_form_inputs_test?.statement_descriptor,
              client_card_types: item?.reserved_pricing?.client_card_types || [],
              additional_fees: item?.reserved_pricing?.additional_fees || {},
              cardTypes: saved_form_CardTypes,
              payout_fees: item?.payout_fees || {},
              wallet_ids: item?.wallet_ids || [],
              ewallet_New_addressess: [],
              disCard_walletes: [],
              fess_conditions: {
                apm: saved_form_fees_details_test[0]?.apm,
                payout: saved_form_fees_details_test[0]?.payout,
                payin: saved_form_fees_details_test[0]?.payin
              },
              gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}





            }
            : type === "Pix"
              ? {
                ...item?.inputs,
                is_live: value === undefined ? false : value,
                subscription_key_test: item?.inputs?.subscription_key_test
                  ? item?.inputs?.subscription_key_test
                  : saved_form_inputs_test?.subscription_key,
                subscription_key_live: item?.inputs?.subscription_key_live
                  ? item?.inputs?.subscription_key_live
                  : "",
                business_name: item?.inputs?.business_name
                  ? item?.inputs?.business_name
                  : saved_form_inputs_test?.business_name,
                client_card_types: item?.reserved_pricing?.client_card_types || [],
                additional_fees: item?.reserved_pricing?.additional_fees || {},
                cardTypes: saved_form_CardTypes,
                payout_fees: item?.payout_fees || {},
                wallet_ids: item?.wallet_ids || [],
                ewallet_New_addressess: [],
                disCard_walletes: [],
                fess_conditions: {
                  apm: saved_form_fees_details_test[0]?.apm,
                  payout: saved_form_fees_details_test[0]?.payout,
                  payin: saved_form_fees_details_test[0]?.payin
                },
                gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}


              }
              : type === "Banwire"
                ? {
                  ...item?.inputs,
                  is_live: value === undefined ? false : value,
                  username_test: item?.inputs?.username_test
                    ? item?.inputs?.username_test
                    : saved_form_inputs_test?.username_test,
                  username_live: item?.inputs?.username_live
                    ? item?.inputs?.username_live
                    : "",
                  client_card_types: item?.reserved_pricing?.client_card_types || [],
                  additional_fees: item?.reserved_pricing?.additional_fees || {},
                  cardTypes: saved_form_CardTypes,
                  payout_fees: item?.payout_fees || {},
                  wallet_ids: item?.wallet_ids || [],
                  ewallet_New_addressess: [],
                  disCard_walletes: [],
                  fess_conditions: {
                    apm: saved_form_fees_details_test[0]?.apm,
                    payout: saved_form_fees_details_test[0]?.payout,
                    payin: saved_form_fees_details_test[0]?.payin
                  },
                  gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}


                }
                : type === "Valitor"
                  ? {
                    ...item?.inputs,
                    is_live: value === undefined ? false : value,
                    apikey_test: item?.inputs?.apikey_test
                      ? item?.inputs?.apikey_test
                      : saved_form_inputs_test?.apikey_test,
                    apikey_live: item?.inputs?.apikey_live
                      ? item?.inputs?.apikey_live
                      : "",
                    client_card_types: item?.reserved_pricing?.client_card_types || [],
                    additional_fees: item?.reserved_pricing?.additional_fees || {},
                    cardTypes: saved_form_CardTypes,
                    payout_fees: item?.payout_fees || {},
                    wallet_ids: item?.wallet_ids || [],
                    ewallet_New_addressess: [],
                    disCard_walletes: [],
                    fess_conditions: {
                      apm: saved_form_fees_details_test[0]?.apm,
                      payout: saved_form_fees_details_test[0]?.payout,
                      payin: saved_form_fees_details_test[0]?.payin
                    },
                    gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                  }
                  : type === "Bambora"
                    ? {
                      ...item?.inputs,
                      is_live: value === undefined ? false : value,
                      merchantId_test: item?.inputs?.merchantId_test
                        ? item?.inputs?.merchantId_test
                        : saved_form_inputs_test?.merchantId_test,
                      merchantId_live: item?.inputs?.merchantId_live
                        ? item?.inputs?.merchantId_live
                        : "",
                      passcode_test: item?.inputs?.passcode_test
                        ? item?.inputs?.passcode_test
                        : saved_form_inputs_test?.passcode_test,
                      passcode_live: item?.inputs?.passcode_live
                        ? item?.inputs?.passcode_live
                        : "",
                      hash_key_test: item?.inputs?.hash_key_test
                        ? item?.inputs?.hash_key_test
                        : saved_form_inputs_test?.hash_key_test,
                      hash_key_live: item?.inputs?.hash_key_live
                        ? item?.inputs?.hash_key_live
                        : "",
                      client_card_types: item?.reserved_pricing?.client_card_types || [],
                      additional_fees: item?.reserved_pricing?.additional_fees || {},
                      cardTypes: saved_form_CardTypes,
                      payout_fees: item?.payout_fees || {},
                      wallet_ids: item?.wallet_ids || [],
                      ewallet_New_addressess: [],
                      disCard_walletes: [],
                      fess_conditions: {
                        apm: saved_form_fees_details_test[0]?.apm,
                        payout: saved_form_fees_details_test[0]?.payout,
                        payin: saved_form_fees_details_test[0]?.payin
                      },
                      gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                    }
                    : type === "Re-set"
                      ? {
                        ...item?.inputs,
                        is_live: value === undefined ? false : value,
                        secretKey_test: item?.inputs?.secretKey_test
                          ? item?.inputs?.secretKey_test
                          : saved_form_inputs_test?.merchant_id_test,
                        secretKey_live: item?.inputs?.secretKey_live
                          ? item?.inputs?.secretKey_live
                          : "",
                        brand_id_test: item?.inputs?.brand_id_test
                          ? item?.inputs?.brand_id_test
                          : saved_form_inputs_test?.merchant_id_test,
                        brand_id_live: item?.inputs?.brand_id_live
                          ? item?.inputs?.brand_id_live
                          : "",
                        client_card_types: item?.reserved_pricing?.client_card_types || [],
                        additional_fees: item?.reserved_pricing?.additional_fees || {},
                        cardTypes: saved_form_CardTypes,
                        payout_fees: item?.payout_fees || {},
                        wallet_ids: item?.wallet_ids || [],
                        ewallet_New_addressess: [],
                        disCard_walletes: [],
                        fess_conditions: {
                          apm: saved_form_fees_details_test[0]?.apm,
                          payout: saved_form_fees_details_test[0]?.payout,
                          payin: saved_form_fees_details_test[0]?.payin
                        },
                        gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                      }
                      : type === "Memphis"
                        ? {
                          ...item?.inputs,
                          is_live: value === undefined ? false : value,
                          commerce_id_test: item?.inputs?.commerce_id_test
                            ? item?.inputs?.commerce_id_test
                            : saved_form_inputs_test?.commerce_id_test,
                          commerce_id_live: item?.inputs?.commerce_id_live
                            ? item?.inputs?.commerce_id_live
                            : "",
                          commerce_name_test: item?.inputs?.commerce_name_test
                            ? item?.inputs?.commerce_name_test
                            : saved_form_inputs_test?.commerce_name_test,
                          commerce_name_live: item?.inputs?.commerce_name_live
                            ? item?.inputs?.commerce_name_live
                            : "",
                          tkr_test: item?.inputs?.tkr_test
                            ? item?.inputs?.tkr_test
                            : saved_form_inputs_test?.tkr_test,
                          tkr_live: item?.inputs?.tkr_live ? item?.inputs?.tkr_live : "",
                          client_card_types: item?.reserved_pricing?.client_card_types || [],
                          additional_fees: item?.reserved_pricing?.additional_fees || {},
                          cardTypes: saved_form_CardTypes,
                          payout_fees: item?.payout_fees || {},
                          wallet_ids: item?.wallet_ids || [],
                          ewallet_New_addressess: [],
                          disCard_walletes: [],
                          fess_conditions: {
                            apm: saved_form_fees_details_test[0]?.apm,
                            payout: saved_form_fees_details_test[0]?.payout,
                            payin: saved_form_fees_details_test[0]?.payin
                          },
                          gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                        }
                        : type === "Raypd"
                          ? {
                            ...item?.inputs,
                            is_live: value === undefined ? false : value,
                            secret_key_test: item?.inputs?.secret_key_test
                              ? item?.inputs?.secret_key_test
                              : saved_form_inputs_test?.secret_key_test,
                            secret_key_live: item?.inputs?.secret_key_live
                              ? item?.inputs?.secret_key_live
                              : "",
                            access_key_test: item?.inputs?.access_key_test
                              ? item?.inputs?.access_key_test
                              : saved_form_inputs_test?.access_key_test,
                            access_key_live: item?.inputs?.access_key_live
                              ? item?.inputs?.access_key_live
                              : "",
                            client_card_types: item?.reserved_pricing?.client_card_types || [],
                            additional_fees: item?.reserved_pricing?.additional_fees || {},
                            cardTypes: saved_form_CardTypes,
                            payout_fees: item?.payout_fees || {},
                            wallet_ids: item?.wallet_ids || [],
                            ewallet_New_addressess: [],
                            disCard_walletes: [],
                            fess_conditions: {
                              apm: saved_form_fees_details_test[0]?.apm,
                              payout: saved_form_fees_details_test[0]?.payout,
                              payin: saved_form_fees_details_test[0]?.payin
                            },
                            gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                          }
                          : type === "Scipiopay"
                            ? {
                              ...item?.inputs,
                              is_live: value === undefined ? false : value,
                              shop_id_test: item?.inputs?.shop_id_test
                                ? item?.inputs?.shop_id_test
                                : saved_form_inputs_test?.shop_id_test,
                              shop_id_live: item?.inputs?.shop_id_live
                                ? item?.inputs?.shop_id_live
                                : "",
                              shop_secret_key_test: item?.inputs?.shop_secret_key_test
                                ? item?.inputs?.shop_secret_key_test
                                : saved_form_inputs_test?.shop_secret_key_test,
                              shop_secret_key_live: item?.inputs?.shop_secret_key_live
                                ? item?.inputs?.shop_secret_key_live
                                : "",
                              client_card_types: item?.reserved_pricing?.client_card_types || [],
                              additional_fees: item?.reserved_pricing?.additional_fees || {},
                              cardTypes: saved_form_CardTypes,
                              payout_fees: item?.payout_fees || {},
                              wallet_ids: item?.wallet_ids || [],
                              ewallet_New_addressess: [],
                              disCard_walletes: [],
                              fess_conditions: {
                                apm: saved_form_fees_details_test[0]?.apm,
                                payout: saved_form_fees_details_test[0]?.payout,
                                payin: saved_form_fees_details_test[0]?.payin
                              },
                              gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}




                            }
                            : type === "MIT"
                              ? {
                                ...item?.inputs,
                                is_live: value === undefined ? false : value,
                                id_branch_test: item?.inputs?.id_branch_test
                                  ? item?.inputs?.id_branch_test
                                  : saved_form_inputs_test?.id_branch_test,
                                id_branch_live: item?.inputs?.id_branch_live
                                  ? item?.inputs?.id_branch_live
                                  : "",
                                id_company_test: item?.inputs?.id_company_test
                                  ? item?.inputs?.id_company_test
                                  : saved_form_inputs_test?.id_company_test,
                                id_company_live: item?.inputs?.id_company_live
                                  ? item?.inputs?.id_company_live
                                  : "",
                                merchant_id_test: item?.inputs?.merchant_id_test
                                  ? item?.inputs?.merchant_id_test
                                  : saved_form_inputs_test?.id_company_test,
                                merchant_id_live: item?.inputs?.merchant_id_live
                                  ? item?.inputs?.merchant_id_live
                                  : "",
                                password_test: item?.inputs?.password_test
                                  ? item?.inputs?.password_test
                                  : saved_form_inputs_test?.id_company_test,
                                password_live: item?.inputs?.password_live
                                  ? item?.inputs?.password_live
                                  : "",
                                user_code_test: item?.inputs?.user_code_test
                                  ? item?.inputs?.user_code_test
                                  : saved_form_inputs_test?.id_company_test,
                                user_code_live: item?.inputs?.user_code_live
                                  ? item?.inputs?.user_code_live
                                  : "",
                                client_card_types: item?.reserved_pricing?.client_card_types || [],
                                additional_fees: item?.reserved_pricing?.additional_fees || {},
                                cardTypes: saved_form_CardTypes,
                                payout_fees: item?.payout_fees || {},
                                wallet_ids: item?.wallet_ids || [],
                                ewallet_New_addressess: [],
                                disCard_walletes: []

                              } :
                              type === "Betapay"
                                ? {
                                  ...item?.inputs,
                                  is_live: value === undefined ? false : value,
                                  api_token_test: item?.inputs?.api_token_test
                                    ? item?.inputs?.api_token_test
                                    : saved_form_inputs_test?.api_token_test,
                                  api_token_live: item?.inputs?.api_token_live
                                    ? item?.inputs?.api_token_live
                                    : "",
                                  merchant_id_test: item?.inputs?.merchant_id_test
                                    ? item?.inputs?.merchant_id_test
                                    : saved_form_inputs_test?.merchant_id_test,
                                  merchant_id_live: item?.inputs?.merchant_id_live
                                    ? item?.inputs?.merchant_id_live
                                    : "",
                                  terminal_id_test: item?.inputs?.terminal_id_test
                                    ? item?.inputs?.terminal_id_test
                                    : saved_form_inputs_test?.terminal_id_test,
                                  terminal_id_live: item?.inputs?.terminal_id_live
                                    ? item?.inputs?.terminal_id_live
                                    : "",
                                  client_card_types: item?.reserved_pricing?.client_card_types || [],
                                  additional_fees: item?.reserved_pricing?.additional_fees || {},
                                  cardTypes: saved_form_CardTypes,
                                  payout_fees: item?.payout_fees || {},
                                  wallet_ids: item?.wallet_ids || [],
                                  ewallet_New_addressess: [],
                                  disCard_walletes: [],
                                  fess_conditions: {
                                    apm: saved_form_fees_details_test[0]?.apm,
                                    payout: saved_form_fees_details_test[0]?.payout,
                                    payin: saved_form_fees_details_test[0]?.payin
                                  },
                                  gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}




                                } :
                                type === "Aurea Via"
                                  ? {
                                    ...item?.inputs,
                                    is_live: value === undefined ? false : value,
                                    companyNum_test: item?.inputs?.companyNum_test
                                      ? item?.inputs?.companyNum_test
                                      : saved_form_inputs_test?.companyNum_test,
                                    companyNum_live: item?.inputs?.companyNum_live
                                      ? item?.inputs?.companyNum_live
                                      : "",
                                    personalHashkey_test: item?.inputs?.personalHashkey_test
                                      ? item?.inputs?.personalHashkey_test
                                      : saved_form_inputs_test?.personalHashkey_test,
                                    personalHashkey_live: item?.inputs?.personalHashkey_live
                                      ? item?.inputs?.personalHashkey_live
                                      : "",

                                    client_card_types: item?.reserved_pricing?.client_card_types || [],
                                    additional_fees: item?.reserved_pricing?.additional_fees || {},
                                    cardTypes: saved_form_CardTypes,
                                    payout_fees: item?.payout_fees || {},
                                    wallet_ids: item?.wallet_ids || [],
                                    ewallet_New_addressess: [],
                                    disCard_walletes: [],
                                    fess_conditions: {
                                      apm: saved_form_fees_details_test[0]?.apm,
                                      payout: saved_form_fees_details_test[0]?.payout,
                                      payin: saved_form_fees_details_test[0]?.payin
                                    }

                                  } :
                                  type === "Kasha"
                                    ? {
                                      ...item?.inputs,
                                      is_live: value === undefined ? false : value,
                                      api_key_test: item?.inputs?.api_key_test
                                        ? item?.inputs?.api_key_test
                                        : saved_form_inputs_test?.api_key_test,
                                      api_key_live: item?.inputs?.api_key_live
                                        ? item?.inputs?.api_key_live
                                        : "",

                                      merchant_domain_test: item?.inputs?.merchant_domain_test
                                        ? item?.inputs?.merchant_domain_test
                                        : saved_form_inputs_test?.merchant_domain_test,
                                      merchant_domain_live: item?.inputs?.merchant_domain_live
                                        ? item?.inputs?.merchant_domain_live
                                        : "",
                                      client_card_types: item?.reserved_pricing?.client_card_types || [],
                                      additional_fees: item?.reserved_pricing?.additional_fees || {},
                                      cardTypes: saved_form_CardTypes,
                                      payout_fees: item?.payout_fees || {},
                                      wallet_ids: item?.wallet_ids || [],
                                      ewallet_New_addressess: [],
                                      disCard_walletes: [],
                                      fess_conditions: {
                                        apm: saved_form_fees_details_test[0]?.apm,
                                        payout: saved_form_fees_details_test[0]?.payout,
                                        payin: saved_form_fees_details_test[0]?.payin
                                      },
                                      gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}




                                    }
                                    : type === "Sipe" || type === "Blumon" || type === "Pix-Lotus"
                                      ? saved_form_inputs?.[0]?.client_id !== ""
                                        ? {
                                          ...item?.inputs, is_live: value,
                                          client_card_types: item?.reserved_pricing?.client_card_types || [],
                                          additional_fees: item?.reserved_pricing?.additional_fees || {},
                                          cardTypes: saved_form_CardTypes,
                                          payout_fees: item?.payout_fees || {},
                                          wallet_ids: item?.wallet_ids || [],
                                          ewallet_New_addressess: [],
                                          disCard_walletes: [],
                                          fess_conditions: {
                                            apm: saved_form_fees_details_test[0]?.apm,
                                            payout: saved_form_fees_details_test[0]?.payout,
                                            payin: saved_form_fees_details_test[0]?.payin
                                          },
                                          gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}


                                        }
                                        : {
                                          ...item?.inputs, is_live: value, ...saved_form_inputs_test,
                                          client_card_types: item?.reserved_pricing?.client_card_types || [],
                                          additional_fees: item?.reserved_pricing?.additional_fees || {},
                                          cardTypes: saved_form_CardTypes,
                                          payout_fees: item?.payout_fees || {},
                                          wallet_ids: item?.wallet_ids || [],
                                          ewallet_New_addressess: [],
                                          disCard_walletes: [],
                                          fess_conditions: {
                                            apm: saved_form_fees_details_test[0]?.apm,
                                            payout: saved_form_fees_details_test[0]?.payout,
                                            payin: saved_form_fees_details_test[0]?.payin
                                          },
                                          gateway_method_fees: item?.reserved_pricing?.gateway_method_fees || {}

                                        }

                                      : {
                                        ...item?.inputs, is_live: value,


                                      };

        return {
          ...item,
          inputs: clonedObject



        };
      });

    if (newSavedInput && newSavedInput.length > 0 && newSavedInput[0]?.inputs) {
      setFormValues(newSavedInput[0]?.inputs ?? {});
    } else {
      let form_inputs = gatewayTypes.filter((data) => data?.name === type);
      if (form_inputs && form_inputs.length > 0) {
        setFormValues(form_inputs[0]?.inputs);
      }
    }
  }, [type, addedgateways, gatewayTypes]);


  const handleReset = () => {
    setFormValues({});
    setFormValuesErr({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };





  const handleCurrencyChange = (value: string) => {
    setCurrencyConv(value);
  };

  function handleValueChange(e: any) {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    setFormValuesErr({ ...formValuesErr, [e.target.id]: "" });
  }



  const handlePriceValueChange = (e: any, index: number, cardType: string, inputFieldType: any) => {
    // let prevFilter = formValues?.client_card_types?.filter(())
    // console.log("EE", e)

    // if (inputFieldType == "cardType_currency_code") {
    //   if (formValues?.client_card_types?.filter((f: any) => f?.card_name == cardType)?.length > 0) {
    //     setFormValues((prev: any) => {
    //       return {
    //         ...prev,
    //         client_card_types: prev?.client_card_types?.map((m: any, i: number) => {
    //           if (cardType == m?.card_name) {
    //             return {
    //               ...m,
    //               currency_code: e?.value
    //             }
    //           } else {
    //             return m
    //           }
    //         })
    //       }
    //     })


    //   } else {

    //     let data = {
    //       card_name: cardType,
    //       currency_code: e?.value
    //     }

    //     // let newArr=[...formValues?.client_card_types]
    //     // newArr.push(data)

    //     setFormValues((prev: any) => {
    //       return {
    //         ...prev,
    //         client_card_types: [...prev?.client_card_types, data]
    //       }
    //     })

    //   }
    // } else {

    //   const name = e.target.id
    //   let value = e.target.value

    //   if (name == "allow_card") {
    //     value = value == "true" ? true : false
    //   }

    //   if (name == "percentage_fee") {
    //     value = value >= 0 && value <= 100 ? value : ""
    //   }

    //   if (name == "fixed_fee") {
    //     value = value >= 0 ? value : ""
    //   }


    //   if (formValues?.client_card_types?.filter((f: any) => f?.card_name == cardType)?.length > 0) {
    //     setFormValues((prev: any) => {
    //       return {
    //         ...prev,
    //         client_card_types: prev?.client_card_types?.map((m: any, i: number) => {
    //           if (cardType == m?.card_name) {
    //             return {
    //               ...m,
    //               [name]: value
    //             }
    //           } else {
    //             return m
    //           }
    //         })
    //       }
    //     })


    //   } else {

    //     let data = {
    //       card_name: cardType,
    //       [name]: value
    //     }

    //     // let newArr=[...formValues?.client_card_types]
    //     // newArr.push(data)

    //     setFormValues((prev: any) => {
    //       return {
    //         ...prev,
    //         client_card_types: [...prev?.client_card_types, data]
    //       }
    //     })

    //   }

    // }


    if (inputFieldType == "cardType_currency_code") {
      if (formValues?.client_card_types?.filter((f: any) => f?.card_name == cardType)?.length > 0) {
        setFormValues((prev: any) => {
          return {
            ...prev,
            client_card_types: prev?.client_card_types?.map((m: any, i: number) => {
              if (cardType == m?.card_name) {
                return {
                  ...m,
                  currency_code: e
                }
              } else {
                return m
              }
            })
          }
        })


      } else {

        let data = {
          card_name: cardType,
          currency_code: e
        }

        // let newArr=[...formValues?.client_card_types]
        // newArr.push(data)

        setFormValues((prev: any) => {
          return {
            ...prev,
            client_card_types: [...prev?.client_card_types, data]
          }
        })

      }
    } else {

      const name = e.target.id
      let value = e.target.value

      if (name == "allow_card") {
        value = value == "true" ? true : false
      }

      if (name == "percentage_fee") {
        value = value >= 0 && value <= 100 ? value : ""
      }

      if (name == "fixed_fee") {
        value = value >= 0 ? value : ""
      }


      if (formValues?.client_card_types?.filter((f: any) => f?.card_name == cardType)?.length > 0) {
        setFormValues((prev: any) => {
          return {
            ...prev,
            client_card_types: prev?.client_card_types?.map((m: any, i: number) => {
              if (cardType == m?.card_name) {
                return {
                  ...m,
                  [name]: value
                }
              } else {
                return m
              }
            })
          }
        })


      } else {

        let data = {
          card_name: cardType,
          [name]: value
        }


        setFormValues((prev: any) => {
          return {
            ...prev,
            client_card_types: [...prev?.client_card_types, data]
          }
        })

      }

    }



  }

  const handleAdditionalValueChange = (e: any, feeType: string) => {
    if (feeType == "dispute_currency_code") {

      setFormValues((prev: any) => {
        return {
          ...prev,
          additional_fees: {
            ...prev?.additional_fees,
            dispute_fees: {
              ...prev?.additional_fees?.dispute_fees,
              currency_code: e
            }
          }
        }
      })
    } else if (feeType == "chargeback_currency_code") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          additional_fees: {
            ...prev?.additional_fees,
            chargeback_fees: {
              ...prev?.additional_fees?.chargeback_fees,
              currency_code: e
            }
          }
        }
      })
    }


    else {
      const name = e.target.id
      let value = e.target.value





      if (name == "percentage_fee") {
        value = value >= 0 && value <= 100 ? value : ""
      }

      if (name == "fixed_fee") {
        value = value >= 0 ? value : ""
      }

      setFormValues((prev: any) => {
        return {
          ...prev,
          additional_fees: {
            ...prev?.additional_fees,
            [feeType]: {
              ...prev?.additional_fees[feeType],
              [name]: value
            }
          }
        }
      })
    }


  }

  const handleGatewayMethodfeesValueChange = (e: any, feeType: string) => {

    if (feeType == "apm_currency_code") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          gateway_method_fees: {
            ...prev?.gateway_method_fees,
            apm_fees: {
              ...prev?.gateway_method_fees?.apm_fees,
              currency_code: e
            }
          }
        }
      })
    } else if (feeType == "payout_currency_code") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          gateway_method_fees: {
            ...prev?.gateway_method_fees,
            payout_fees: {
              ...prev?.gateway_method_fees?.payout_fees,
              currency_code: e
            }
          }
        }
      })
    }

    else if (feeType == "payin_currency_code") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          gateway_method_fees: {
            ...prev?.gateway_method_fees,
            payin_fees: {
              ...prev?.gateway_method_fees?.payin_fees,
              currency_code: e
            }
          }
        }
      })
    }


    else {
      const name = e.target.id
      let value = e.target.value





      if (name == "percentage_fee") {
        value = value >= 0 && value <= 100 ? value : ""
      }

      if (name == "fixed_fee") {
        value = value >= 0 ? value : ""
      }

      setFormValues((prev: any) => {
        return {
          ...prev,
          gateway_method_fees: {
            ...prev?.gateway_method_fees,
            [feeType]: {
              ...prev?.gateway_method_fees[feeType],
              [name]: value
            }
          }
        }
      })
    }


  }

  const handlePayoutValueChange = (e: any, sectionType: string) => {

    const name = e.target.id
    let value = e.target.value;


    if (name == "percentage") {
      value = value >= 0 && value <= 100 ? value : ""
    }

    if (name == "fixed_fee") {
      value = value >= 0 ? value : ""
    }

    setFormValues((prev: any) => {
      return {
        ...prev,
        payout_fees: {
          ...prev?.payout_fees,
          // [feeType]: {
          // ...prev?.payout_fees[feeType],
          [name]: value
          // }
        }
      }
    })

  }

  const handleEwalletValueChange = (e: any, wallet_data: any, wallet_value_type: string) => {
    const name = e.target.id;
    let value = e.target.value;
    if (name == "percentage") {
      value = value >= 0 && value <= 100 ? value : ""
    }

    if (name == "fixed_fee") {
      value = value >= 0 ? value : ""
    }

    if (
      formValues?.wallet_ids?.filter((f: any) => f?.wallet_id == wallet_data?.wallet_id)?.length > 0
    ) {

      setFormValues((prev: any) => {
        return {
          ...prev,
          wallet_ids: prev?.wallet_ids?.map((m: any, i: number) => {
            if (wallet_data?.wallet_id == m?.wallet_id) {
              return {
                ...m,
                [name]: value
              }
            } else {
              return m
            }
          })
        }
      })

    } else {
      let data = {

        wallet_address: "",
        percentage: "",
        [name]: value
      }

      // let newArr=[...formValues?.client_card_types]
      // newArr.push(data)

      setFormValues((prev: any) => {
        return {
          ...prev,
          wallet_ids: [...prev?.wallet_ids, data]
        }
      })
    }






  }


  const handleReseSelectChange = (selectedValue: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      reserved: selectedValue
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleNewWallet = (e_type: string, NewWalletIndex: any) => {
    if (e_type == "add_New_wallet") {
      let isCompleted = formValues?.ewallet_New_addressess?.every((wallet_details: any) => {

        return wallet_details?.wallet_address != "" && wallet_details?.percentage != ""

      })
      if (isCompleted) {

        let newData = {
          wallet_address: "",
          percentage: ""

        }

        setFormValues((prev: any) => {
          return {
            ...prev,
            ewallet_New_addressess: [...prev?.ewallet_New_addressess, newData]
          }
        })
        // setAddNewWallet((prev: any) => {
        //   return [...prev, newData]
        // })

      } else {
        toast.error("Please Enter all details for wallet!")
      }


    }

    if (e_type == "remove_New_wallet") {
      // setAddNewWallet((prev: any) => {
      //   return prev?.filter((f: any, index: number) => Number(index) != Number(NewWalletIndex))
      // })

      setFormValues((prev: any) => {
        return {
          ...prev,
          ewallet_New_addressess: prev?.ewallet_New_addressess?.filter((f: any, index: number) => Number(index) != Number(NewWalletIndex))
        }
      })

    }


  }

  const handleDiscardExistingWallets = (walletData: any) => {

    if (walletData?.is_verified) {
      const WalletAddress = walletData?.wallet_id
      // setDescardWallet((prev: any) => {
      //   return [prev, WalletAddress]
      // })

      let tempArr: any = []
      if (formValues?.disCard_walletes?.length > 0) {
        formValues?.disCard_walletes?.forEach((m: any) => {
          tempArr.push(m)
        })
      }



      tempArr.push(WalletAddress)




      setFormValues((prev: any) => {
        return {
          ...prev,
          wallet_ids: prev?.wallet_ids?.filter((f: any) => f?.wallet_id != WalletAddress),
          disCard_walletes: tempArr
        }
      })
    } else {
      toast.error("You can not remove wallet, please Verify with 2FA code!")
    }



  }

  const handleVerifyWallet = () => {
    let pwdd = wallertVerifyIput?.password
    let passCoded = wallertVerifyIput?.passCode
    if (!pwdd || !passCoded) {
      toast.error("Please enter all required fields!")
      return
    }
    let gateway = gatewayTypes.filter((data) => data?.name === type);
    let gateway_id = gateway && gateway.length > 0 ? gateway[0]?.id : "";
    let data: any = {
      id: id,
      gateway_id: gateway_id,
      "password": wallertVerifyIput?.password,
      "otp": wallertVerifyIput?.passCode,
      "wallet_id": wallertVerifyIput?.wallet_id
    }

    // setIsLoading(true);
    // toast({
    //   type: "loading",

    //   visible: true
    // })


    verifyWalletAddress(data).then((data) => {
      let ewallet = {
        ...data?.ewallet,
        is_verified: data?.is_verified

      }
      let res_wallet_id = ewallet?.wallet_id
      setFormValues((prev: any) => {
        return {
          ...prev,
          wallet_ids: prev?.wallet_ids?.map((m: any) => {
            if (res_wallet_id == m?.wallet_id) {
              return {
                ...m,
                ...ewallet
              }
            } else {
              return m
            }
          })
        }
      })
      toast.success("Verified sucessfully!");

    })
      .catch((err: any) => {
        console.log(err)
        toast.error(
          err?.response?.data?.message
        );

        // toast({
        //   type: "loading",
        //   // message:"Verif",
        //   visible: false
        // })


      })


      .finally(() => {
        setIsLoading(false);
        onCloseWalletAddress()

      });

  }

  const handleNewWalletValueChange = (e: any, wallet_data: any, wallet_value_type: string, wallet_Index: number) => {
    const name = e.target.id;
    let value = e.target.value;
    if (name == "percentage") {
      value = value >= 0 && value <= 100 ? value : ""
    }

    if (name == "fixed_fee") {
      value = value >= 0 ? value : ""
    }
    setFormValues((prev: any) => {
      return {
        ...prev,
        ewallet_New_addressess: prev?.ewallet_New_addressess?.map((wallet_details: any, i: number) => {
          if (i == wallet_Index) {
            return {
              ...wallet_details,
              [name]: value

            }
          } else {
            return wallet_details
          }

        })
      }

    })

  }

  const fetchAllGateways = () => {
    setIsLoading(true);
    console.log("assigned_payment_methods", assigned_payment_methods);
    getAllGateways(assigned_payment_methods?.assigned_payment_methods)
      .then((data) => {

        setGatewayTypes(data);
        if (Array.isArray(data)) {

          if (data.length > 0) {
            setType(data[0]?.name);
            setHashID(data[0]?.id);
          }

          const newDataArray = data.map((elem) => ({
            ...elem,
            image: getImage(elem.name),
          }));
          setGatewayTypes(newDataArray);


          data.forEach((elem) => {
            setStoreGateWayId(elem.id);
          });

        }

      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching gateways"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });

  };
  //console.log("setStoreGateWayId",storeGetwayId);
  const getImage = (name: string) => {
    if (name === 'Sipe') {
      return sipe;
    } else if (name === 'Pix-Lotus') {
      return pixLotus;
    } else if (name === 'Pix') {
      return pix;
    } else if (name === 'Blumon') {
      return blumon;
    } else if (name === 'Stripe') {
      return stripe;
    } else if (name === 'Memphis') {
      return memphis;
    } else if (name === 'Raypd') {
      return repyd;
    } else if (name === 'Banwire') {
      return banwire;
    } else if (name === 'Valitor') {
      return valitor;
    } else if (name === 'Bambora') {
      return bambora;
    } else if (name === 'Re-set') {
      return reSet;
    } else if (name === 'MIT') {
      return mit;
    } else if (name === 'Scipiopay') {
      return Scipiopay;
    } else if (name === 'Betapay') {
      return Betapay;
    } else if (name === 'Aurea Via') {
      return Aurea_via;
    }
    else if (name === 'Kasha') {
      return Kasha;
    }

  }
  const fetchAddedGateways = () => {
    setIsLoading(true);
    getAllGatewaysByClient(id)
      .then((data) => {
        setAddedGateways((preval: any) => {
          return preval.map((ele: any) => {
            let filtered = data.filter((d: any) => d?.name === ele?.name);

            if (filtered) {
              return { ...ele, ...filtered[0], inputs: filtered[0]?.auth_info };
            }
          });
        });
        setCurrencyConv(data.filter((d: any) => d?.name == type)?.to_convert ? "currencyConverter" : "requestPassthrough")
        console.log("addedgateways", type);

      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
          "Something went wrong while fetching gateways"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });

    // console.log("addedgateways", addedgateways);
  };

  console.log("addedgateways", addedgateways);

  useEffect(() => {
    console.log("a", addedgateways)
    // addedgateways.map(())
    setCurrencyConv(addedgateways.filter((d: any) => d?.name == type)[0]?.to_convert ? "currencyConverter" : "requestPassthrough")
    setSelectedCurrency(addedgateways.filter((d: any) => d?.name == type)[0]?.to_convert ? addedgateways.filter((d: any) => d?.name == type)[0]?.new_currency : 'USD')
  }, [type, addedgateways])
  function validateData() {
    let escape_arr = [
      "statement_descriptor",
      "statement_descriptor_suffix",
      "business_name",
      "descriptor",
    ];
    if (type === "Stripe") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? "secret_key_live"
          : "secret_key_test";
      escape_arr?.push(data);
    } else if (type === "Pix") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? "subscription_key_live"
          : "subscription_key_test";
      escape_arr?.push(data);
    } else if (type === "Memphis") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["commerce_id_live", "commerce_name_live", "tkr_live"]
          : ["commerce_id_test", "commerce_name_test", "tkr_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Raypd") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["access_key_live", "secret_key_live"]
          : ["access_key_test", "secret_key_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Banwire") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["username_live", "username_live"]
          : ["username_test", "username_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Valitor") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["apikey_live", "apikey_live"]
          : ["apikey_test", "apikey_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Bambora") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["merchantId_live", "passcode_live", "hash_key_live"]
          : ["merchantId_test", "passcode_test", "hash_key_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Re-set") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? ["secretKey_live", "brand_id_live"]
          : ["secretKey_test", "brand_id_test"];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "MIT") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? [
            "id_branch_live",
            "id_company_live",
            "merchant_id_live",
            "password_live",
            "user_code_live",
          ]
          : [
            "id_branch_test",
            "id_company_test",
            "merchant_id_test",
            "password_test",
            "user_code_test",
          ];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    }
    else if (type === "Scipiopay") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? [
            "shop_secret_key_live",
            "shop_id_live",

          ]
          : [
            "shop_id_test",
            "shop_secret_key_test",

          ];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    } else if (type === "Betapay") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? [
            "api_token_live",
            "merchant_id_live",
            "terminal_id_live"

          ]
          : [
            "api_token_test",
            "merchant_id_test",
            "terminal_id_test"

          ];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    }
    else if (type === "Aurea Via") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? [
            "companyNum_live", "personalHashkey_live"


          ]
          : [
            "companyNum_test", "personalHashkey_test",


          ];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    }
    else if (type === "Kasha") {
      const data =
        formValues?.is_live === false || formValues?.is_live === undefined
          ? [
            "api_key_live",
            "merchant_domain_live"


          ]
          : [
            "api_key_test",
            "merchant_domain_test"


          ];
      data?.map((item) => {
        return escape_arr?.push(item);
      });
    }

    let verifier: any;
    Object.keys(formValues).forEach((key: any) => {
      let temp_arr = escape_arr.filter((ele) => key === ele);

      if (!(temp_arr.length > 0)) {
        if (!formValues[key as keyof any]) {
          verifier = { ...verifier, [key]: "Please enter a value" };
        }
      }
    });

    setFormValuesErr(verifier);

    const hasEmptyValues = Object.entries(formValues).some(([key, value]) => {
      let temp_arr_ = escape_arr.filter((ele) => key === ele);
      if (!(temp_arr_.length > 0)) {
        return typeof value === "string"
          ? value?.toString()?.trim() === ""
          : value === "";
      }
    });

    if (hasEmptyValues) {
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    let validate = validateData();

    const bank_account_number_details = [...Array(bankInfoCount)].map((_, index) => {

      let accountNo = formValues?.[`accountNo_${index}`];
      let transitNo = formValues?.[`transitNo_${index}`];
      let institutionNo = formValues?.[`institutionNo_${index}`];

      if (accountNo && transitNo && institutionNo) {
        delete formValues[`accountNo_${index}`];
        delete formValues[`transitNo_${index}`];
        delete formValues[`institutionNo_${index}`];
        return {
          account_number: accountNo,
          transit_number: transitNo,
          institution_number: institutionNo
        };

      } else {
        return null;
      }
    }).filter(Boolean);

    setFormValues({ ...formValues, bank_account_number_details: bank_account_number_details });


    /*const wallet_addresses = [...Array(walletCount)].map((_, index) => {
      
      let address = formValues?.[`address_${index}`];
      
      if(address){        
        delete formValues[`address_${index}`];
        return {          
          address: address
        };
        
      } else {
        return null;
      }
    }).filter(Boolean);
 
    setFormValues({ ...formValues, wallet_addresses:wallet_addresses });*/

    //console.log("formValues",formValues,bank_account_number_details); return;

    if (validate) {
      let savedgateway = addedgateways.filter((data) => data?.name === type);
      let saved_gateway_id =
        savedgateway && savedgateway.length > 0
          ? savedgateway[0]?.client_id ?? ""
          : "";

      let gateway = gatewayTypes.filter((data) => data?.name === type);
      let gateway_id = gateway && gateway.length > 0 ? gateway[0]?.id : "";
      let newVALUE;
      if (type === "Memphis") {
        newVALUE = {
          commerce_id_live:
            formValues?.is_live === true
              ? formValues?.commerce_id_live
                ? formValues?.commerce_id_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.commerce_id_live
                ? savedgateway[0]?.inputs?.commerce_id_live
                : "",
          commerce_id_test:
            formValues?.is_live === false
              ? formValues?.commerce_id_test
                ? formValues?.commerce_id_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.commerce_id_test
                ? savedgateway[0]?.inputs?.commerce_id_test
                : "",
          commerce_name_live:
            formValues?.is_live === true
              ? formValues?.commerce_name_live
                ? formValues?.commerce_name_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.commerce_name_live
                ? savedgateway[0]?.inputs?.commerce_name_live
                : "",
          commerce_name_test:
            formValues?.is_live === false
              ? formValues?.commerce_name_test
                ? formValues?.commerce_name_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.commerce_name_test
                ? savedgateway[0]?.inputs?.commerce_name_test
                : "",
          tkr_live:
            formValues?.is_live === true
              ? formValues?.tkr_live
                ? formValues?.tkr_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.tkr_live
                ? savedgateway[0]?.inputs?.tkr_live
                : "",
          tkr_test:
            formValues?.is_live === false
              ? formValues?.tkr_test
                ? formValues?.tkr_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.tkr_test
                ? savedgateway[0]?.inputs?.tkr_test
                : "",
          descriptor: formValues?.descriptor,

          priority: formValues?.priority,
        };
      }
      if (type === "Pix") {
        newVALUE = {
          subscription_key_live:
            formValues?.is_live === true
              ? formValues?.subscription_key_live
                ? formValues?.subscription_key_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.subscription_key_live
                ? savedgateway[0]?.inputs?.subscription_key_live
                : "",
          subscription_key_test:
            formValues?.is_live === false
              ? formValues?.subscription_key_test
                ? formValues?.subscription_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.subscription_key_test
                ? savedgateway[0]?.inputs?.subscription_key_test
                : "",
          business_name: formValues?.business_name
            ? formValues?.business_name?.trim()
            : "",
          descriptor: formValues?.descriptor,
          priority: formValues?.priority,
        };
      }
      if (type === "Stripe") {
        newVALUE = {
          statement_descriptor: formValues?.statement_descriptor
            ? formValues?.statement_descriptor
            : "",
          statement_descriptor_suffix: formValues?.statement_descriptor_suffix
            ? formValues?.statement_descriptor_suffix
            : "",
          secret_key_live:
            formValues?.is_live === true
              ? formValues?.secret_key_live
                ? formValues?.secret_key_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.secret_key_live
                ? savedgateway[0]?.inputs?.secret_key_live
                : "",
          secret_key_test:
            formValues?.is_live === false
              ? formValues?.secret_key_test
                ? formValues?.secret_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.secret_key_test?.trim()
                ? savedgateway[0]?.inputs?.secret_key_test
                : "",
          priority: formValues?.priority,
        };
      }
      if (type === "Raypd") {
        newVALUE = {
          secret_key_live:
            formValues?.is_live === true
              ? formValues?.secret_key_live
                ? formValues?.secret_key_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.secret_key_live
                ? savedgateway[0]?.inputs?.secret_key_live
                : "",
          secret_key_test:
            formValues?.is_live === false
              ? formValues?.secret_key_test
                ? formValues?.secret_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.secret_key_test
                ? savedgateway[0]?.inputs?.secret_key_test
                : "",
          access_key_live:
            formValues?.is_live === true
              ? formValues?.access_key_live
                ? formValues?.access_key_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.access_key_live
                ? savedgateway[0]?.inputs?.access_key_live
                : "",
          access_key_test:
            formValues?.is_live === false
              ? formValues?.access_key_test
                ? formValues?.access_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.access_key_test
                ? savedgateway[0]?.inputs?.access_key_test
                : "",
          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Banwire") {
        newVALUE = {
          username_live:
            formValues?.is_live === true
              ? formValues?.username_live
                ? formValues?.username_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.username_live
                ? savedgateway[0]?.inputs?.username_live
                : "",
          username_test:
            formValues?.is_live === false
              ? formValues?.username_test
                ? formValues?.username_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.username_test
                ? savedgateway[0]?.inputs?.username_test
                : "",

          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Valitor") {
        newVALUE = {
          apikey_live:
            formValues?.is_live === true
              ? formValues?.apikey_live
                ? formValues?.apikey_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.apikey_live
                ? savedgateway[0]?.inputs?.apikey_live
                : "",
          apikey_test:
            formValues?.is_live === false
              ? formValues?.apikey_test
                ? formValues?.apikey_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.apikey_test
                ? savedgateway[0]?.inputs?.apikey_test
                : "",

          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Bambora") {
        newVALUE = {
          merchantId_live:
            formValues?.is_live === true
              ? formValues?.merchantId_live
                ? formValues?.merchantId_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchantId_live
                ? savedgateway[0]?.inputs?.merchantId_live
                : "",
          merchantId_test:
            formValues?.is_live === false
              ? formValues?.merchantId_test
                ? formValues?.merchantId_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchantId_test
                ? savedgateway[0]?.inputs?.merchantId_test
                : "",
          passcode_live:
            formValues?.is_live === true
              ? formValues?.passcode_live
                ? formValues?.passcode_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.passcode_live
                ? savedgateway[0]?.inputs?.passcode_live
                : "",
          passcode_test:
            formValues?.is_live === false
              ? formValues?.passcode_test
                ? formValues?.passcode_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.passcode_test
                ? savedgateway[0]?.inputs?.passcode_test
                : "",
          hash_key_test:
            formValues?.is_live === false
              ? formValues?.hash_key_test
                ? formValues?.hash_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.hash_key_test
                ? savedgateway[0]?.inputs?.hash_key_test
                : "",
          hash_key_live: formValues?.is_live === true
            ? formValues?.hash_key_live
              ? formValues?.hash_key_live?.trim()
              : ""
            : savedgateway[0]?.inputs?.hash_key_live
              ? savedgateway[0]?.inputs?.hash_key_live
              : "",

          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Re-set") {
        newVALUE = {
          secretKey_live:
            formValues?.is_live === true
              ? formValues?.secretKey_live
                ? formValues?.secretKey_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.secretKey_live
                ? savedgateway[0]?.inputs?.secretKey_live
                : "",
          secretKey_test:
            formValues?.is_live === false
              ? formValues?.secretKey_test
                ? formValues?.secretKey_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.secretKey_test
                ? savedgateway[0]?.inputs?.secretKey_test
                : "",
          brand_id_live:
            formValues?.is_live === true
              ? formValues?.brand_id_live
                ? formValues?.brand_id_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.brand_id_live
                ? savedgateway[0]?.inputs?.brand_id_live
                : "",
          brand_id_test:
            formValues?.is_live === false
              ? formValues?.brand_id_test
                ? formValues?.brand_id_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.brand_id_test
                ? savedgateway[0]?.inputs?.brand_id_test
                : "",
          descriptor: formValues?.descriptor,

        };
      }
      if (type === "MIT") {
        newVALUE = {
          id_branch_live:
            formValues?.is_live === true
              ? formValues?.id_branch_live
                ? formValues?.id_branch_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.id_branch_live
                ? savedgateway[0]?.inputs?.id_branch_live
                : "",
          id_branch_test:
            formValues?.is_live === false
              ? formValues?.id_branch_test
                ? formValues?.id_branch_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.id_branch_test
                ? savedgateway[0]?.inputs?.id_branch_test
                : "",
          id_company_live:
            formValues?.is_live === true
              ? formValues?.id_company_live
                ? formValues?.id_company_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.id_company_live
                ? savedgateway[0]?.inputs?.id_company_live
                : "",
          id_company_test:
            formValues?.is_live === false
              ? formValues?.id_company_test
                ? formValues?.id_company_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.id_company_test
                ? savedgateway[0]?.inputs?.id_company_test
                : "",

          merchant_id_live:
            formValues?.is_live === true
              ? formValues?.merchant_id_live
                ? formValues?.merchant_id_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_id_live
                ? savedgateway[0]?.inputs?.merchant_id_live
                : "",
          merchant_id_test:
            formValues?.is_live === false
              ? formValues?.merchant_id_test
                ? formValues?.merchant_id_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_id_test
                ? savedgateway[0]?.inputs?.merchant_id_test
                : "",

          password_live:
            formValues?.is_live === true
              ? formValues?.password_live
                ? formValues?.password_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.password_live
                ? savedgateway[0]?.inputs?.password_live
                : "",
          password_test:
            formValues?.is_live === false
              ? formValues?.password_test
                ? formValues?.password_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.password_test
                ? savedgateway[0]?.inputs?.password_test
                : "",

          user_code_live:
            formValues?.is_live === true
              ? formValues?.user_code_live
                ? formValues?.user_code_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.user_code_live
                ? savedgateway[0]?.inputs?.user_code_live
                : "",
          user_code_test:
            formValues?.is_live === false
              ? formValues?.user_code_test
                ? formValues?.user_code_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.user_code_test
                ? savedgateway[0]?.inputs?.user_code_test
                : "",
          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Betapay") {
        newVALUE = {
          api_token_live:
            formValues?.is_live === true
              ? formValues?.api_token_live
                ? formValues?.api_token_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.api_token_live
                ? savedgateway[0]?.inputs?.api_token_live
                : "",
          api_token_test:
            formValues?.is_live === false
              ? formValues?.api_token_test
                ? formValues?.api_token_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.api_token_test
                ? savedgateway[0]?.inputs?.api_token_test
                : "",
          merchant_id_live:
            formValues?.is_live === true
              ? formValues?.merchant_id_live
                ? formValues?.merchant_id_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_id_live
                ? savedgateway[0]?.inputs?.merchant_id_live
                : "",
          merchant_id_test:
            formValues?.is_live === true
              ? formValues?.merchant_id_test
                ? formValues?.merchant_id_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_id_test
                ? savedgateway[0]?.inputs?.merchant_id_test
                : "",
          terminal_id_live:
            formValues?.is_live === true
              ? formValues?.terminal_id_live
                ? formValues?.terminal_id_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.terminal_id_live
                ? savedgateway[0]?.inputs?.terminal_id_live
                : "",
          terminal_id_test:
            formValues?.is_live === true
              ? formValues?.terminal_id_test
                ? formValues?.terminal_id_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.terminal_id_test
                ? savedgateway[0]?.inputs?.terminal_id_test
                : "",

          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Aurea Via") {
        newVALUE = {
          companyNum_live:
            formValues?.is_live === true
              ? formValues?.companyNum_live
                ? formValues?.companyNum_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.companyNum_live
                ? savedgateway[0]?.inputs?.companyNum_live
                : "",
          companyNum_test:
            formValues?.is_live === false
              ? formValues?.companyNum_test
                ? formValues?.companyNum_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.companyNum_test
                ? savedgateway[0]?.inputs?.companyNum_test
                : "",
          personalHashkey_live: formValues?.is_live === true
            ? formValues?.personalHashkey_live
              ? formValues?.personalHashkey_live?.trim()
              : ""
            : savedgateway[0]?.inputs?.personalHashkey_live
              ? savedgateway[0]?.inputs?.personalHashkey_live
              : "",
          personalHashkey_test:
            formValues?.is_live === false
              ? formValues?.personalHashkey_test
                ? formValues?.personalHashkey_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.personalHashkey_test
                ? savedgateway[0]?.inputs?.personalHashkey_test
                : "",




          descriptor: formValues?.descriptor,

        };
      }
      if (type === "Kasha") {
        newVALUE = {
          api_key_live:
            formValues?.is_live === true
              ? formValues?.api_key_live
                ? formValues?.api_key_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.api_key_live
                ? savedgateway[0]?.inputs?.api_key_live
                : "",
          api_key_test:
            formValues?.is_live === false
              ? formValues?.api_key_test
                ? formValues?.api_key_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.api_key_test
                ? savedgateway[0]?.inputs?.api_key_test
                : "",

          merchant_domain_live:
            formValues?.is_live === true
              ? formValues?.merchant_domain_live
                ? formValues?.merchant_domain_live?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_domain_live
                ? savedgateway[0]?.inputs?.merchant_domain_live
                : "",
          merchant_domain_test:
            formValues?.is_live === false
              ? formValues?.merchant_domain_test
                ? formValues?.merchant_domain_test?.trim()
                : ""
              : savedgateway[0]?.inputs?.merchant_domain_test
                ? savedgateway[0]?.inputs?.merchant_domain_test
                : "",





          descriptor: formValues?.descriptor,

        };
      }
      if (gateway_id) {
        console.log("formValuesformValues", formValues)
        setIsLoading(true);
        let NewWalletDetails: any = []
        if (formValues?.wallet_ids?.filter((f: any) => f?.wallet_address)?.length > 0) {
          formValues?.wallet_ids?.filter((f: any) => f?.wallet_address)?.forEach((data: any) => {
            NewWalletDetails.push(data)
          })

        }
        if (formValues?.ewallet_New_addressess?.length > 0) {
          formValues?.ewallet_New_addressess?.forEach((data: any) => {
            NewWalletDetails.push(data)

          })
        }

        let newFormValuesForPayload = {
          ...formValues
        }


        Object.keys(newFormValuesForPayload)?.forEach((key) => {
          console.log("key", key)
          // alert(key)
          if (["client_card_types", "additional_fees", "payout_fees", "wallet_ids", "disCard_walletes", "ewallet_New_addressess", "bank_account_numbers", "cardTypes", "fess_conditions"].includes(key)) {
            delete newFormValuesForPayload[key]
          }


        })

        // Object.keys(newVALUE)?.forEach((key) => {
        //   console.log("key", key)
        //   if (["client_card_types", "additional_fees", "payout_fees", "wallet_ids", "disCard_walletes", "ewallet_New_addressess", "bank_account_numbers"].includes(key)) {
        //     delete newVALUE[key]
        //   }

        //   if (["auth_info"].includes(key)) {
        //     delete newVALUE?.auth_info?.["cardTypes"]
        //   }
        // })
        const inputs = {
          client_id: id,
          gateway_id: gateway_id,
          method: saved_gateway_id ? "put" : "post",
          body: {
            auth_info:
              type === "Pix" || type === "Stripe" ? newVALUE : newFormValuesForPayload,
          },
          is_live: formValues?.is_live ? formValues?.is_live : false,
          to_convert: currencyConv == "requestPassthrough" ? false : true,
          new_currency: currencyConv == "requestPassthrough" ? "none" : selectedCurrency,
          reserved_pricing: {
            client_card_types: formValues?.client_card_types,
            additional_fees: formValues?.additional_fees,
            gateway_method_fees: formValues?.gateway_method_fees
          },
          settlement: {
            payout_fees: formValues?.payout_fees,
            ewallet_addressess: NewWalletDetails,
            discarded_wallets: formValues?.disCard_walletes
          },


        };

        createClientGateway(inputs)
          .then((data) => {
            fetchClients();
            toast.success("Client gateway saved");
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ?? "Client gateway adding failed"
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  const handleToggle = () => {
    setFormValues({
      ...formValues,
      is_live: !formValues.is_live,
    });
  };

  const handleAddBankInfo = () => {
    setBankInfoCount((prevCount) => prevCount + 1);
  };
  const handleRemoveBankInfo = () => {
    setBankInfoCount((prevCount) => prevCount - 1);
  };
  const handleAddWallet = () => {
    setWalletCount((prevCount) => prevCount + 1);
  };
  const handleRemoveWallet = () => {
    setWalletCount((prevCount) => prevCount - 1);
  };

  //console.log("currencyConv",currencyConv);
  const onCloseWalletAddress = () => {
    setIsOpenWalletAddress(false)
    setWallertVerifyIput({})

  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpenWalletAddress ? 'hidden' : 'auto';
  }, [isOpenWalletAddress])

  return (
    // <CreateClientGatewaysModal.Provider value={user}>
    <>
      <button className="text-indigo-500 outline-none" title="Payment Gateways">
        <MdIntegrationInstructions
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            fetchAllGateways();
            fetchAddedGateways();
            onOpen();
          }}
        />
      </button>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="!z-[1002]  !m-auto max-w-2xl md:top-[12vh]"> */}
        <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody className="sm:max-h-[calc(100vh)] max-h-[calc(100vh)] overflow-auto">

            <Card extra=" max-w-[800px] px-[30px] pt-[35px] pb-[35px] flex flex-col !z-[1004] ">
              {/*<Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem >
                  <h4 className="text-2xl font-bold">
                    <AccordionButton className="bg-slate-100">
                      <Box as="span" flex='1' textAlign='left'>
                        {type && (type === "Sipe"
                              ? "Integrate SIPE"
                              : type === "Blumon"
                              ? "Blumon"
                              : type === "Pix"
                              ? "PIX"
                              : type === "Pix-Lotus"
                              ? "Pix-Lotus"
                              : type === "Stripe"
                              ? "Stripe"
                              : type === "Memphis"
                              ? "Memphis"
                              : type === "Raypd"
                              ? "Raypd"
                              : type === "MIT"
                              ? "MIT"
                              : type === "Banwire"
                              ? "Banwire"
                              : type === "Valitor"
                              ? "Valitor"
                              : null)} 
                        &nbsp; Gateway Credentials
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h4>
                  <AccordionPanel pb={4}>*/}
              <h1 className="mb-[20px] text-2xl font-bold">Payment Gateway</h1>
              <div className="flex max-w-[940px]  items-center gap-2 overflow-auto pb-[10px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                {gatewayTypes.map((data: iGateway) => {

                  return (
                    <Card
                      extra={`p-2 bg-gray-100 border w-[150px] min-w-[150px] cursor-pointer ${data.name === type
                        ? "border-indigo-400"
                        : "border-gray-200 dark:!border-white/10"
                        }`}
                      onClick={() => {
                        // handleReset();
                        setType(data?.name);
                        setHashID(data?.id)
                      }}
                      key={Math.random()}
                    >
                      <div className="flex h-full w-32  flex-col items-center justify-between gap-2">
                        <div className="flex h-full items-center justify-center">
                          {methodName ? (
                            <Image
                              src={data?.image}
                              alt={data?.name}
                              className="h-24 w-24 object-contain"
                            />
                          ) : ""}
                        </div>
                        <p className="capitalize break-all">
                          {methodName ? (data?.name.replaceAll("_", " ")) : data?.id}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
              {isLoading && (
                <DivLoader className="absolute right-2 top-6 m-3 h-6 w-6 border-indigo-500" />
              )}

              <Accordion className='w-full' allowToggle defaultIndex={[0]}>
                <AccordionItem className='border-b border-gray-200 py-[17px] dark:!border-white/10' >
                  <h4>
                    <AccordionButton className='flex justify-between' >
                      <span className='text-left font-bold text-navy-900 dark:text-white'>
                        Credentials
                      </span>
                      <AccordionIcon className='text-left !text-navy-900 dark:!text-white' />
                    </AccordionButton>
                  </h4>
                  <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white '>
                    {type && (
                      // <div className="mt-5 max-h-[calc(100vh-500px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">
                      // <div className="mt-5 sm:max-h-[calc(100vh-500px)] max-h-[calc(100vh-400px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">
                      <div className="mt-5 sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">
                        <div className="flex justify-between">
                          <p className="mb-0 text-xl font-bold">
                            {methodName ? (
                              type === "Sipe"
                                ? "Integrate SIPE"
                                : type === "Blumon"
                                  ? "Integrate Blumon"
                                  : type === "Pix"
                                    ? "Integrate PIX"
                                    : type === "Pix-Lotus"
                                      ? "Integrate Pix-Lotus"
                                      : type === "Stripe"
                                        ? "Integrate Stripe"
                                        : type === "Memphis"
                                          ? "Integrate Memphis"
                                          : type === "Raypd"
                                            ? "Integrate Raypd"
                                            : type === "MIT"
                                              ? "Integrate MIT"
                                              : type === "Banwire"
                                                ? "Integrate Banwire"
                                                : type === "Valitor"
                                                  ? "Integrate Valitor"
                                                  : type === "Bambora"
                                                    ? "Integrate Bambora"
                                                    : type === "Re-set"
                                                      ? "Integrate Re-set"
                                                      : type === "Scipiopay"
                                                        ? "Integrate Scipiopay"
                                                        : type === "Aurea Via"
                                                          ? "Integrate Aurea Via"
                                                          : type === "Betapay"
                                                            ? "Integrate Betapay"
                                                            : type === "Kasha"
                                                              ? "Integrate Kasha"


                                                              : ""
                            ) : (
                              <span className="flex emethod justify-around item-center">Integrate <ShortTruncateCopy info={hashID.slice(0, hashID.search("-"))} showCopy={false} /></span>
                            )}
                          </p>
                          {type === "Sipe" ||
                            type === "Blumon" ||
                            type === "Pix" ||
                            type === "Pix-Lotus" ||
                            type === "Stripe" ||
                            type === "Raypd" ||
                            type === "MIT" ||
                            type === "Banwire" ||
                            type === "Valitor" ||
                            type === "Bambora" ||
                            type === "Re-set" ||
                            type === "Memphis" ||
                            type === "Scipiopay" ||
                            type === "Aurea Via" ||
                            type === "Betapay" ||
                            type === "Kasha"
                            ? (
                              <div className="flex justify-end">
                                <label className="relative mb-3 inline-flex cursor-pointer items-center">
                                  <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    // @ts-ignore
                                    checked={formValues && formValues.is_live}
                                    onChange={handleToggle}
                                  />

                                  <div className="peer h-6 w-11 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800" />

                                  <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                                    {formValues.is_live ? "Live" : "Test"}
                                  </span>
                                </label>
                              </div>
                            ) : (
                              ""
                            )}
                        </div>

                        {type === "Sipe" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Business Name*"
                              placeholder="Google inc."
                              id="business_name"
                              type="text"
                              value={formValues?.business_name ?? ""}
                              state={formValuesErr?.business_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
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
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            {/* <InputField
                            variant="auth"
                            extra="mb-1"
                            label="Base URL*"
                            placeholder=""
                            id="base_url"
                            type="text"
                            value={formValues?.base_url ?? ""}
                            state={formValuesErr?.base_url ? "error" : ""}
                            onChange={handleValueChange}
                          /> */}
                          </>
                        )}
                        {type === "Blumon" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Business Name*"
                              placeholder="Google inc."
                              id="business_name"
                              type="text"
                              value={formValues?.business_name ?? ""}
                              state={formValuesErr?.business_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Username*"
                              placeholder="test"
                              id="username"
                              type="text"
                              value={formValues?.username ?? ""}
                              state={formValuesErr?.username ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Password*"
                              placeholder="********"
                              id="password"
                              type={passwordShow ? "text" : "password"}
                              value={formValues?.password ?? ""}
                              state={formValuesErr?.password ? "error" : ""}
                              onChange={handleValueChange}
                              passwordShow={passwordShow}
                              setPasswordShow={setPasswordShow}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}

                        {type === "Stripe" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Secret Key*"
                              placeholder="Secret key"
                              id={
                                formValues.is_live === true
                                  ? "secret_key_live"
                                  : formValues.is_live === false
                                    ? "secret_key_test"
                                    : "secret_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.secret_key_live
                                  : formValues.is_live === false
                                    ? formValues?.secret_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.secret_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.secret_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <div className="mt-3 flex w-full gap-3">
                              <InputField
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
                                variant="auth"
                                extra="mb-1 w-full"
                                label="Statement Descriptor Suffix"
                                placeholder="Custom descriptor suffix"
                                id="statement_descriptor_suffix"
                                type="text"
                                value={formValues?.statement_descriptor_suffix ?? ""}
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
                        {type === "Pix-Lotus" && (
                          <>
                            <InputField
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
                              variant="auth"
                              extra="mb-1 w-full"
                              label="Authorization"
                              placeholder=""
                              id="authorization"
                              type="text"
                              value={formValues?.authorization ?? ""}
                              state={formValuesErr?.authorization ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
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
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Pix" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Business Name*"
                              placeholder="Google inc."
                              id="business_name"
                              type="text"
                              value={formValues?.business_name ?? ""}
                              state={formValuesErr?.business_name ? "error" : ""}
                              onChange={handleValueChange}
                            />

                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Subscription key*"
                              placeholder="Subscription key"
                              id={
                                formValues.is_live === true
                                  ? "subscription_key_live"
                                  : formValues.is_live === false
                                    ? "subscription_key_test"
                                    : "subscription_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.subscription_key_live
                                  : formValues.is_live === false
                                    ? formValues?.subscription_key_test
                                    : formValues?.subscription_key_test
                              }
                              // value={formValues?.subscription_key ?? ""}
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.subscription_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.subscription_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            {/* <label
                              className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                              htmlFor="types"
                            >
                              Identification type*
                            </label>
                            <select
                              name="select"
                              id="types"
                              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                              value={formValues?.types}
                              onChange={handleValueChange}
                            >
                              <option value="">Select type</option>
                              <option value="cpf">CPF</option>
                           
                            </select>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Identification number*"
                              placeholder="Enter identification number"
                              id="number"
                              type="number"
                              value={formValues?.number ?? ""}
                              state={formValuesErr?.number ? "error" : ""}
                              onChange={handleValueChange}
                            /> */}
                            {/* <InputField
                              variant="auth"
                              extra="mb-1"
                              label="First name*"
                              placeholder="first name"
                              id="first_name"
                              type="text"
                              value={formValues?.first_name ?? ""}
                              state={formValuesErr?.first_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Last name*"
                              placeholder="last name"
                              id="last_name"
                              type="text"
                              value={formValues?.last_name ?? ""}
                              state={formValuesErr?.last_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Email*"
                              placeholder="Enter email"
                              id="email"
                              type="email"
                              value={formValues?.email ?? ""}
                              state={formValuesErr?.email ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Description*"
                              placeholder="Enter description"
                              id="description"
                              type="text"
                              value={formValues?.description ?? ""}
                              state={formValuesErr?.description ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Amount*"
                              placeholder="Enter amount"
                              id="amount"
                              type="number"
                              value={formValues?.amount ?? ""}
                              state={formValuesErr?.amount ? "error" : ""}
                              onChange={handleValueChange}
                            />

                            <label
                              className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                              htmlFor="types"
                            >
                              Identification type*
                            </label>
                            <select
                              name="select"
                              id="types"
                              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                              value={formValues?.type}
                              onChange={handleValueChange}
                            >
                              <option value="">Select type</option>
                              <option value="cpf">CPF</option>
                              <option value="cpf1">CPF1</option>
                            </select>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Identification number*"
                              placeholder="Enter identification number"
                              id="number"
                              type="number"
                              value={formValues?.number ?? ""}
                              state={formValuesErr?.number ? "error" : ""}
                              onChange={handleValueChange}
                            /> */}
                          </>
                        )}
                        {type === "Memphis" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Commerce Id*"
                              placeholder="Commerce Id"
                              id={
                                formValues.is_live === true
                                  ? "commerce_id_live"
                                  : formValues.is_live === false
                                    ? "commerce_id_test"
                                    : "commerce_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.commerce_id_live
                                  : formValues.is_live === false
                                    ? formValues?.commerce_id_test
                                    : formValues?.commerce_id_test
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.commerce_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.commerce_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Commerce Name*"
                              placeholder="Commerce Name"
                              id={
                                formValues.is_live === true
                                  ? "commerce_name_live"
                                  : formValues.is_live === false
                                    ? "commerce_name_test"
                                    : "commerce_name_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.commerce_name_live
                                  : formValues.is_live === false
                                    ? formValues?.commerce_name_test
                                    : formValues?.commerce_name_test
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.commerce_name_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.commerce_name_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="TKR*"
                              placeholder="TKR"
                              id={
                                formValues.is_live === true
                                  ? "tkr_live"
                                  : formValues.is_live === false
                                    ? "tkr_test"
                                    : "tkr_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.tkr_live
                                  : formValues.is_live === false
                                    ? formValues?.tkr_test
                                    : formValues?.tkr_test
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.tkr_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.tkr_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            {/* <label
                              className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                              htmlFor="types"
                            >
                              Identification type*
                            </label>
                            <select
                              name="select"
                              id="types"
                              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                              value={formValues?.types}
                              onChange={handleValueChange}
                            >
                              <option value="">Select type</option>
                              <option value="cpf">CPF</option>
                           
                            </select>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Identification number*"
                              placeholder="Enter identification number"
                              id="number"
                              type="number"
                              value={formValues?.number ?? ""}
                              state={formValuesErr?.number ? "error" : ""}
                              onChange={handleValueChange}
                            /> */}
                            {/* <InputField
                              variant="auth"
                              extra="mb-1"
                              label="First name*"
                              placeholder="first name"
                              id="first_name"
                              type="text"
                              value={formValues?.first_name ?? ""}
                              state={formValuesErr?.first_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Last name*"
                              placeholder="last name"
                              id="last_name"
                              type="text"
                              value={formValues?.last_name ?? ""}
                              state={formValuesErr?.last_name ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Email*"
                              placeholder="Enter email"
                              id="email"
                              type="email"
                              value={formValues?.email ?? ""}
                              state={formValuesErr?.email ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Description*"
                              placeholder="Enter description"
                              id="description"
                              type="text"
                              value={formValues?.description ?? ""}
                              state={formValuesErr?.description ? "error" : ""}
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Amount*"
                              placeholder="Enter amount"
                              id="amount"
                              type="number"
                              value={formValues?.amount ?? ""}
                              state={formValuesErr?.amount ? "error" : ""}
                              onChange={handleValueChange}
                            />

                            <label
                              className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white"
                              htmlFor="types"
                            >
                              Identification type*
                            </label>
                            <select
                              name="select"
                              id="types"
                              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                              value={formValues?.type}
                              onChange={handleValueChange}
                            >
                              <option value="">Select type</option>
                              <option value="cpf">CPF</option>
                              <option value="cpf1">CPF1</option>
                            </select>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Identification number*"
                              placeholder="Enter identification number"
                              id="number"
                              type="number"
                              value={formValues?.number ?? ""}
                              state={formValuesErr?.number ? "error" : ""}
                              onChange={handleValueChange}
                            /> */}
                          </>
                        )}

                        {type === "Raypd" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Secret Key*"
                              placeholder="Secret key"
                              id={
                                formValues.is_live === true
                                  ? "secret_key_live"
                                  : formValues.is_live === false
                                    ? "secret_key_test"
                                    : "secret_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.secret_key_live
                                  : formValues.is_live === false
                                    ? formValues?.secret_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.secret_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.secret_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Access Key*"
                              placeholder="Access key"
                              id={
                                formValues.is_live === true
                                  ? "access_key_live"
                                  : formValues.is_live === false
                                    ? "access_key_test"
                                    : "access_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.access_key_live
                                  : formValues.is_live === false
                                    ? formValues?.access_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.access_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.access_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Banwire" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Username*"
                              placeholder="Username"
                              id={
                                formValues.is_live === true
                                  ? "username_live"
                                  : formValues.is_live === false
                                    ? "username_test"
                                    : "username_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.username_live
                                  : formValues.is_live === false
                                    ? formValues?.username_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.username_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.username_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Valitor" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="API Key*"
                              placeholder="API Key"
                              id={
                                formValues.is_live === true
                                  ? "apikey_live"
                                  : formValues.is_live === false
                                    ? "apikey_test"
                                    : "apikey_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.apikey_live
                                  : formValues.is_live === false
                                    ? formValues?.apikey_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.apikey_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.apikey_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Bambora" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Merchant Id*"
                              placeholder="Merchant Id"
                              id={
                                formValues.is_live === true
                                  ? "merchantId_live"
                                  : formValues.is_live === false
                                    ? "merchantId_test"
                                    : "merchantId_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.merchantId_live
                                  : formValues.is_live === false
                                    ? formValues?.merchantId_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.merchantId_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.merchantId_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Passcode*"
                              placeholder="Passcode"
                              id={
                                formValues.is_live === true
                                  ? "passcode_live"
                                  : formValues.is_live === false
                                    ? "passcode_test"
                                    : "passcode_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.passcode_live
                                  : formValues.is_live === false
                                    ? formValues?.passcode_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.passcode_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.passcode_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Hash Key*"
                              placeholder="Hash Key"
                              id={
                                formValues.is_live === true
                                  ? "hash_key_live"
                                  : formValues.is_live === false
                                    ? "hash_key_test"
                                    : "hash_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.hash_key_live
                                  : formValues.is_live === false
                                    ? formValues?.hash_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.hash_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.hash_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Re-set" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Secret Key*"
                              placeholder="Secret Key"
                              id={
                                formValues.is_live === true
                                  ? "secretKey_live"
                                  : formValues.is_live === false
                                    ? "secretKey_test"
                                    : "secretKey_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.secretKey_live
                                  : formValues.is_live === false
                                    ? formValues?.secretKey_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.secretKey_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.secretKey_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Brand ID*"
                              placeholder="Brand ID"
                              id={
                                formValues.is_live === true
                                  ? "brand_id_live"
                                  : formValues.is_live === false
                                    ? "brand_id_test"
                                    : "brand_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.brand_id_live
                                  : formValues.is_live === false
                                    ? formValues?.brand_id_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.brand_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.brand_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />

                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "MIT" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Id Branch*"
                              placeholder="Id Branch"
                              id={
                                formValues.is_live === true
                                  ? "id_branch_live"
                                  : formValues.is_live === false
                                    ? "id_branch_test"
                                    : "id_branch_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.id_branch_live
                                  : formValues.is_live === false
                                    ? formValues?.id_branch_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.id_branch_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.id_branch_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Id Company*"
                              placeholder="Id Company"
                              id={
                                formValues.is_live === true
                                  ? "id_company_live"
                                  : formValues.is_live === false
                                    ? "id_company_test"
                                    : "id_company_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.id_company_live
                                  : formValues.is_live === false
                                    ? formValues?.id_company_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.id_company_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.id_company_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Merchant Id*"
                              placeholder="Google inc."
                              id={
                                formValues.is_live === true
                                  ? "merchant_id_live"
                                  : formValues.is_live === false
                                    ? "merchant_id_test"
                                    : "merchant_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.merchant_id_live
                                  : formValues.is_live === false
                                    ? formValues?.merchant_id_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.merchant_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.merchant_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Password*"
                              placeholder="********"
                              id={
                                formValues.is_live === true
                                  ? "password_live"
                                  : formValues.is_live === false
                                    ? "password_test"
                                    : "password_test"
                              }
                              type="password"
                              value={
                                formValues.is_live === true
                                  ? formValues?.password_live
                                  : formValues.is_live === false
                                    ? formValues?.password_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.password_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.password_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="User Code*"
                              placeholder="User Code"
                              id={
                                formValues.is_live === true
                                  ? "user_code_live"
                                  : formValues.is_live === false
                                    ? "user_code_test"
                                    : "user_code_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.user_code_live
                                  : formValues.is_live === false
                                    ? formValues?.user_code_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.user_code_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.user_code_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />
                          </>
                        )}
                        {type === "Scipiopay" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Shop id*"
                              placeholder="Shop id"
                              id={
                                formValues.is_live === true
                                  ? "shop_id_live"
                                  : formValues.is_live === false
                                    ? "shop_id_test"
                                    : "shop_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.shop_id_live
                                  : formValues.is_live === false
                                    ? formValues?.shop_id_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.shop_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.shop_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Shop Secret Key*"
                              placeholder="Shop secret key"
                              id={
                                formValues.is_live === true
                                  ? "shop_secret_key_live"
                                  : formValues.is_live === false
                                    ? "shop_secret_key_test"
                                    : "shop_secret_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.shop_secret_key_live
                                  : formValues.is_live === false
                                    ? formValues?.shop_secret_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.shop_secret_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.shop_secret_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />

                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />

                          </>
                        )}
                        {type === "Aurea Via" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Company Number*"
                              placeholder="Company number"
                              id={
                                formValues.is_live === true
                                  ? "companyNum_live"
                                  : formValues.is_live === false
                                    ? "companyNum_test"
                                    : "companyNum_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.companyNum_live
                                  : formValues.is_live === false
                                    ? formValues?.companyNum_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.companyNum_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.companyNum_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />

                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Personal Hash Key*"
                              placeholder="Personal hash key"
                              id={
                                formValues.is_live === true
                                  ? "personalHashkey_live"
                                  : formValues.is_live === false
                                    ? "personalHashkey_test"
                                    : "personalHashkey_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.personalHashkey_live
                                  : formValues.is_live === false
                                    ? formValues?.personalHashkey_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.personalHashkey_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.personalHashkey_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />




                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />

                          </>
                        )}
                        {type === "Betapay" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Api Token*"
                              placeholder="Api Token"
                              id={
                                formValues.is_live === true
                                  ? "api_token_live"
                                  : formValues.is_live === false
                                    ? "api_token_test"
                                    : "api_token_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.api_token_live
                                  : formValues.is_live === false
                                    ? formValues?.api_token_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.api_token_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.api_token_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Merchant Id*"
                              placeholder="Merchant id"
                              id={
                                formValues.is_live === true
                                  ? "merchant_id_live"
                                  : formValues.is_live === false
                                    ? "merchant_id_test"
                                    : "merchant_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.merchant_id_live
                                  : formValues.is_live === false
                                    ? formValues?.merchant_id_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.merchant_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.merchant_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Terminal Id*"
                              placeholder="Terminal id"
                              id={
                                formValues.is_live === true
                                  ? "terminal_id_live"
                                  : formValues.is_live === false
                                    ? "terminal_id_test"
                                    : "terminal_id_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.terminal_id_live
                                  : formValues.is_live === false
                                    ? formValues?.terminal_id_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.terminal_id_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.terminal_id_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />


                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />

                          </>
                        )}
                        {type === "Kasha" && (
                          <>
                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Api Key*"
                              placeholder="Api Key"
                              id={
                                formValues.is_live === true
                                  ? "api_key_live"
                                  : formValues.is_live === false
                                    ? "api_key_test"
                                    : "api_key_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.api_key_live
                                  : formValues.is_live === false
                                    ? formValues?.api_key_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.api_key_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.api_key_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />

                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Merchant Domain*"
                              placeholder="Merchant domain"
                              id={
                                formValues.is_live === true
                                  ? "merchant_domain_live"
                                  : formValues.is_live === false
                                    ? "merchant_domain_test"
                                    : "merchant_domain_test"
                              }
                              type="text"
                              value={
                                formValues.is_live === true
                                  ? formValues?.merchant_domain_live
                                  : formValues.is_live === false
                                    ? formValues?.merchant_domain_test
                                    : ""
                              }
                              state={
                                formValues.is_live === true
                                  ? formValuesErr?.merchant_domain_live
                                    ? "error"
                                    : ""
                                  : formValues.is_live === false
                                    ? formValuesErr?.merchant_domain_test
                                      ? "error"
                                      : ""
                                    : ""
                              }
                              onChange={handleValueChange}
                            />




                            <InputField
                              variant="auth"
                              extra="mb-1"
                              label="Descriptor"
                              placeholder="descriptor"
                              id="descriptor"
                              type="text"
                              value={formValues?.descriptor ?? ""}
                              state={formValuesErr?.descriptor ? "error" : ""}
                              onChange={handleValueChange}
                            />

                          </>
                        )}

                        <div className="flex justify-between">
                          <p className="mb-0 font-bold text-gray-900 pl-2">Currency Converter</p>
                        </div>

                        <div className="flex gap-8 mt-2">
                          <div className="flex gap-2">

                            <Radio
                              id="requestPassthrough"
                              value={"requestPassthrough"}
                              checked={currencyConv === "requestPassthrough"}
                              onChange={(e: any) => setCurrencyConv(e.target.value)} />
                            <label htmlFor="requestPassthrough">Request Passthrough</label>
                          </div>
                          <div className="flex gap-2">
                            <Radio
                              id="currencyConverter"
                              value={"currencyConverter"}
                              checked={currencyConv === "currencyConverter"}
                              onChange={(e: any) => setCurrencyConv(e.target.value)} />
                            <label htmlFor="currencyConverter">Currency Converter</label>
                          </div>
                        </div>
                        {currencyConv == "currencyConverter" ?

                          <div className="mt-4 mb-2">
                            <label
                              htmlFor="org_id"
                              className={`ml-1.5 text-sm font-bold text-gray-900 dark:text-white `}
                            >
                              Select Currency<span className="important">*</span>
                            </label>
                            {/* <select
                        name="org_id"
                        id="org_id"
                        value={selectedCurrency}
                        className={`mt-2 flex h-12 w-full items-center text-gray-700 justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white ${formValuesErr?.org_id
                          ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                          : ""
                          }`}
                        onChange={handleCurrencySelect}
                      >
                        {currencyOptions}
                      </select> */}

                            {/* <Select
                              options={currencyCodes.map((currencyCode) => {
                                const currencyDetails = getCurrencySymbol(currencyCode);
                                return {

                                  value: currencyCode,
                                  label: `${currencyCode}: ${currencyDetails.title}`
                                }
                              })}

                              value={[{ value: selectedCurrency, label: selectedCurrency + ": " + getCurrencySymbol(selectedCurrency)?.title }]}
                              onChange={handleCurrencySelect}
                            /> */}


                            <AntSelect
                              showSearch
                              placeholder="Select currency"
                              optionFilterProp="children"
                              filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              }

                              className="w-full"
                              options={currencyCodes.map((currencyCode) => {
                                const currencyDetails = getCurrencySymbol(currencyCode);
                                return {
                                  value: currencyCode,
                                  label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                }
                              })}


                              value={selectedCurrency}
                              onChange={handleCurrencySelect}
                              notFoundContent={"No options found"}

                            />



                          </div>


                          : ""
                        }
                      </div>
                    )}
                  </AccordionPanel>
                </AccordionItem>

                {pricingRight && <AccordionItem className='border-b border-gray-200 py-[17px] dark:!border-white/10'>
                  <h4>
                    <AccordionButton className='flex justify-between' >
                      <span className='text-left font-bold text-navy-900 dark:text-white'>
                        Pricing
                      </span>
                      <AccordionIcon className='text-left !text-navy-900 dark:!text-white' />
                    </AccordionButton>
                  </h4>
                  <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white'  >
                    <p>
                      {/* <div className="  sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"> */}
                      <div className="mt-5 sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">

                        <div className="" >


                          <span className="font-bold text-gray-900">Card Type</span>
                          <div className="relative overflow-x-auto overflow-y-visible  z-0">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  overflow-y-visible z-0 bg-green">

                              <tbody>
                                {
                                  formValues?.cardTypes?.length > 0 ?
                                    formValues?.cardTypes?.map((card: any, index: number) => {
                                      return <>
                                        <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 overflow-x-auto z-0 overflow-y-visible bg-midnight max-h-[50px]" >


                                          <td className="px-2 py-4  w-[25%]">
                                            <div className="flex">
                                              <Checkbox
                                                id="allow_card"
                                                value={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}


                                                checked={formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}

                                                onChange={(e: any) => { handlePriceValueChange(e, index, card, "") }}


                                              /><span className="mx-2 text-gray-900" > {card}</span>
                                            </div>
                                          </td>
                                          <td className="ps-1 py-2">
                                            <div className="flex">
                                              <div className="relative z-0 flex-auto min-w-[100px]">
                                                <input
                                                  type="number"
                                                  id="percentage_fee"
                                                  className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                  placeholder=" Fee "
                                                  value={formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.percentage_fee ?? ""}
                                                  disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}
                                                  onChange={(e) => { handlePriceValueChange(e, index, card, "") }}

                                                />
                                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                                  <span className="h-6" >%</span>
                                                </div>
                                              </div>
                                              <div className="mx-2 items-center flex"><span>+</span></div>
                                              <div className="relative z-0  flex-auto min-w-[100px]">
                                                <input
                                                  type="number"
                                                  id="fixed_fee"
                                                  className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                  placeholder=" Fixed fee "
                                                  value={formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.fixed_fee ?? ""}
                                                  disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}
                                                  onChange={(e) => { handlePriceValueChange(e, index, card, "") }}

                                                />
                                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                                  <span className="h-6" >
                                                    {
                                                      formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code
                                                    }
                                                  </span>
                                                </div>




                                              </div>
                                            </div>
                                          </td>
                                          <td className=" px-2 py-4 z-0">
                                            <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">

                                              {/* <Select
                                                options={currencyCodes.map((currencyCode) => {
                                                  const currencyDetails = getCurrencySymbol(currencyCode);
                                                  return {

                                                    value: currencyCode,
                                                    label: `${currencyCode}: ${currencyDetails.title}`
                                                  }
                                                })}
                                                isDisabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}
                                                // isClearable={true}
                                                className="basic-single "

                                                value={[{ value: formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code || "", label: (formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code || "Select Currency") + (formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code ? ": " + getCurrencySymbol(formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code)?.title : "") }]}

                                                onChange={(e) => { handlePriceValueChange(e, index, card, "cardType_currency_code") }}


                                              /> */}

                                              {/* <Dropdown
                                                id={String(index)}
                                                showOnFocus={false}
                                                value={
                                                  formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code
                                                }
                                                optionValue="value"
                                                filter

                                                optionLabel="label"
                                                placeholder="Select currency"
                                                options={currencyCodes.map((currencyCode) => {
                                                  const currencyDetails = getCurrencySymbol(currencyCode);
                                                  return {

                                                    value: currencyCode,
                                                    label: `${currencyCode}: ${currencyDetails.title}`
                                                  }
                                                })}
                                                disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}
                                                onChange={(e: any) => { handlePriceValueChange(e, index, card, "cardType_currency_code") }}
                                                className="w-full border"

                                              /> */}

                                              <AntSelect
                                                showSearch
                                                placeholder="Select currency"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                                filterSort={(optionA, optionB) =>
                                                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }

                                                className="w-full"
                                                disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}
                                                options={currencyCodes.map((currencyCode) => {
                                                  const currencyDetails = getCurrencySymbol(currencyCode);
                                                  return {
                                                    value: currencyCode,
                                                    label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                                  }
                                                })}
                                                onChange={(e: any) => { handlePriceValueChange(e, index, card, "cardType_currency_code") }}
                                                value={
                                                  formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.currency_code
                                                }
                                                notFoundContent={"No options found"}

                                              />


                                            </div>

                                          </td>
                                        </tr>
                                      </>
                                    })
                                    : ""

                                }

                              </tbody>
                            </table>
                          </div>

                          <span className="font-bold text-gray-900">Additional Fees</span>

                          <div className="relative overflow-x-auto z-0 overflow-y-visible z-0 add_clas">
                            {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"> */}

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  overflow-y-visible z-0 bg-green">



                              <tbody>
                                {/* <tr className="bg-white dark:bg-gray-800 max-h-[50px] z-0 overflow-y-visible bg-midnight max-h-[50px]"> */}
                                <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 overflow-x-auto z-0 overflow-y-visible bg-midnight max-h-[50px]" >

                                  {/* <td className="ps-2 py-4 w-[25%]"> */}
                                  <td className="px-2 py-4  w-[25%] text-gray-900">

                                    Chargeback fees
                                  </td>
                                  <td className="py-2 ps-1">
                                    <div className="flex ">

                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "
                                          // disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}

                                          value={formValues?.additional_fees?.chargeback_fees?.percentage_fee ?? ""}
                                          onChange={(e) => { handleAdditionalValueChange(e, "chargeback_fees") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>
                                      <div className="mx-2 items-center flex"><span>+</span></div>
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="fixed_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fixed fee "
                                          value={formValues?.additional_fees?.chargeback_fees?.fixed_fee ?? ""}

                                          onChange={(e) => { handleAdditionalValueChange(e, "chargeback_fees") }}


                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >
                                            {
                                              formValues?.additional_fees?.chargeback_fees?.currency_code
                                            }
                                          </span>
                                        </div>




                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 z-0 ">
                                    {/* <div className="items-center max-h-[50px]   overflow-hidden z-10 min-w-[150px] max-w-[200px] w-[170px] z-0 bg-green overflow-visible z-0"> */}
                                    <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">






                                      <AntSelect
                                        showSearch
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                        filterSort={(optionA, optionB) =>
                                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }

                                        className="w-full"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {
                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                          }
                                        })}
                                        onChange={(e) => { handleAdditionalValueChange(e, "chargeback_currency_code") }}
                                        value={
                                          formValues?.additional_fees?.chargeback_fees?.currency_code

                                        }
                                        notFoundContent={"No options found"}


                                      />

                                    </div>
                                  </td>
                                </tr>

                                <tr className="bg-white dark:bg-gray-800 z-0 overflow-y-visible bg-midnight max-h-[50px">
                                  <td className="px-2 py-4 w-[25%]  text-gray-900">
                                    Dispute fees
                                  </td>
                                  <td className="py-2 ps-1">
                                    <div className="flex ">
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "
                                          // disabled={!formValues?.client_card_types?.filter((f: any, i: number) => f?.card_name == card)[0]?.allow_card}

                                          value={formValues?.additional_fees?.dispute_fees?.percentage_fee ?? ""}
                                          onChange={(e) => { handleAdditionalValueChange(e, "dispute_fees") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>

                                      <div className="mx-2 items-center flex"><span>+</span></div>
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="fixed_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fixed fee "
                                          value={formValues?.additional_fees?.dispute_fees?.fixed_fee ?? ""}



                                          onChange={(e) => { handleAdditionalValueChange(e, "dispute_fees") }}


                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >
                                            {
                                              formValues?.additional_fees?.dispute_fees?.currency_code
                                            }
                                          </span>
                                        </div>




                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    {/* <div className="items-center  z-10 min-w-[150px] max-w-[200px] max-h-[50px] w-[170px] z-0 bg-green overflow-visible z-0"> */}
                                    <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">

                                      {/* <Select
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {

                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title}`
                                          }
                                        })}
                                        // isClearable={true}

                                        value={[{ value: formValues?.additional_fees?.dispute_fees?.currency_code || "", label: (formValues?.additional_fees?.dispute_fees?.currency_code || "Select Currency") + (formValues?.additional_fees?.dispute_fees?.currency_code ? ": " + getCurrencySymbol(formValues?.additional_fees?.dispute_fees?.currency_code)?.title : "") }]}

                                        onChange={(e) => { handleAdditionalValueChange(e, "dispute_currency_code") }}


                                        className="basic-single"
                                      /> */}

                                      {/* <Dropdown
                                        // id={String(index)}
                                        optionValue="value"
                                        filter

                                        optionLabel="label"
                                        placeholder="Select currency"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {

                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title}`
                                          }
                                        })}
                                        // isClearable={true}
                                        value={

                                          formValues?.additional_fees?.dispute_fees?.currency_code
                                        }
                                        onChange={(e) => { handleAdditionalValueChange(e, "dispute_currency_code") }}

                                        className="w-full border"

                                      /> */}




                                      <AntSelect
                                        showSearch
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                        filterSort={(optionA, optionB) =>
                                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }

                                        className="w-full"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {
                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                          }
                                        })}
                                        value={

                                          formValues?.additional_fees?.dispute_fees?.currency_code
                                        }
                                        onChange={(e) => { handleAdditionalValueChange(e, "dispute_currency_code") }}

                                        notFoundContent={"No options found"}


                                      />

                                    </div>
                                  </td>
                                </tr>

                                {formValues?.fess_conditions?.apm && <tr className="bg-white dark:bg-gray-800 z-0 overflow-y-visible bg-midnight max-h-[50px">
                                  <td className="px-2 py-4 w-[25%]  text-gray-900">
                                    APM fees
                                  </td>
                                  <td className="py-2 ps-1">
                                    <div className="flex ">
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "

                                          value={formValues?.gateway_method_fees?.apm_fees?.percentage_fee ?? ""}
                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "apm_fees") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>

                                      <div className="mx-2 items-center flex"><span>+</span></div>
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="fixed_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fixed fee "
                                          value={formValues?.gateway_method_fees?.apm_fees?.fixed_fee ?? ""}



                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "apm_fees") }}


                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >
                                            {
                                              formValues?.gateway_method_fees?.apm_fees?.currency_code
                                            }
                                          </span>
                                        </div>




                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">







                                      <AntSelect
                                        showSearch
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                        filterSort={(optionA, optionB) =>
                                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }

                                        className="w-full"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {
                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                          }
                                        })}
                                        value={

                                          formValues?.gateway_method_fees?.apm_fees?.currency_code
                                        }
                                        onChange={(e) => { handleGatewayMethodfeesValueChange(e, "apm_currency_code") }}

                                        notFoundContent={"No options found"}


                                      />

                                    </div>
                                  </td>
                                </tr>}

                                {formValues?.fess_conditions?.payout && <tr className="bg-white dark:bg-gray-800 z-0 overflow-y-visible bg-midnight max-h-[50px">
                                  <td className="px-2 py-4 w-[25%]  text-gray-900">
                                    Payout fees
                                  </td>
                                  <td className="py-2 ps-1">
                                    <div className="flex ">
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "

                                          value={formValues?.gateway_method_fees?.payout_fees?.percentage_fee ?? ""}
                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payout_fees") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>

                                      <div className="mx-2 items-center flex"><span>+</span></div>
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="fixed_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fixed fee "
                                          value={formValues?.gateway_method_fees?.payout_fees?.fixed_fee ?? ""}



                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payout_fees") }}


                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >
                                            {
                                              formValues?.gateway_method_fees?.payout_fees?.currency_code
                                            }
                                          </span>
                                        </div>




                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">







                                      <AntSelect
                                        showSearch
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                        filterSort={(optionA, optionB) =>
                                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }

                                        className="w-full"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {
                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                          }
                                        })}
                                        value={

                                          formValues?.gateway_method_fees?.payout_fees?.currency_code
                                        }
                                        onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payout_currency_code") }}

                                        notFoundContent={"No options found"}


                                      />

                                    </div>
                                  </td>
                                </tr>}


                                {formValues?.fess_conditions?.payin && <tr className="bg-white dark:bg-gray-800 z-0 overflow-y-visible bg-midnight max-h-[50px">
                                  <td className="px-2 py-4 w-[25%]  text-gray-900">
                                    Payin fees
                                  </td>
                                  <td className="py-2 ps-1">
                                    <div className="flex ">
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "

                                          value={formValues?.gateway_method_fees?.payin_fees?.percentage_fee ?? ""}
                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payin_fees") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>

                                      <div className="mx-2 items-center flex"><span>+</span></div>
                                      <div className="relative z-0 flex-auto min-w-[100px]">
                                        <input
                                          type="number"
                                          id="fixed_fee"
                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fixed fee "
                                          value={formValues?.gateway_method_fees?.payin_fees?.fixed_fee ?? ""}



                                          onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payin_fees") }}


                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >
                                            {
                                              formValues?.gateway_method_fees?.payin_fees?.currency_code
                                            }
                                          </span>
                                        </div>




                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className=" max-h-[50px] z-0 bg-green overflow-visible z-0 min-w-[150px] max-w-[200px] w-[170px]">







                                      <AntSelect
                                        showSearch
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input?.toUpperCase())}
                                        filterSort={(optionA, optionB) =>
                                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }

                                        className="w-full"
                                        options={currencyCodes.map((currencyCode) => {
                                          const currencyDetails = getCurrencySymbol(currencyCode);
                                          return {
                                            value: currencyCode,
                                            label: `${currencyCode}: ${currencyDetails.title?.toUpperCase()}`
                                          }
                                        })}
                                        value={

                                          formValues?.gateway_method_fees?.payin_fees?.currency_code
                                        }
                                        onChange={(e) => { handleGatewayMethodfeesValueChange(e, "payin_currency_code") }}

                                        notFoundContent={"No options found"}


                                      />

                                    </div>
                                  </td>
                                </tr>}

                              </tbody>

                            </table>
                          </div>




                        </div>
                      </div>
                    </p>
                  </AccordionPanel>
                </AccordionItem>}
                {settelmentRight && <AccordionItem className='border-b border-gray-200 py-[17px] dark:!border-white/10'>
                  <h4>
                    <AccordionButton className='flex justify-between'>
                      <span className='text-left font-bold text-navy-900 dark:text-white' >
                        Settlement
                      </span>
                      <AccordionIcon className='text-left !text-navy-900 dark:!text-white' />
                    </AccordionButton>
                  </h4>
                  <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white'>
                    {/* <h4>Payout Fees</h4> */}
                    <div className="mt-5 sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-3xl shadow-shadow-500 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:!border-white/10 dark:bg-navy-800 dark:shadow-none">

                      <div className="relative overflow-x-auto overflow-y-visible">


                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  overflow-y-visible">
                          {/* <thead className="">
                          <tr>
                            <th scope="col" className="px-2 py-3 ">
                            </th>
                            <th scope="col" className=" py-3 text-start ">
                            </th>
                            <th scope="col" className="px-2 py-3 ">
                            </th>
                          </tr>
                        </thead> */}
                          <tbody>
                            <tr className="  z-0 overflow-y-visible  max-h-[50px]">
                              <td className="px-2 py-3  font-bold text-gray-900">
                                Payout Fees
                              </td>
                              <td className=" px-2 py-3">

                                <div className="flex px-4 ">
                                  <div className="relative z-0   min-w-[100px]">
                                    <input
                                      type="number"
                                      id="percentage"
                                      className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                      placeholder=" Fee "
                                      value={formValues?.payout_fees?.percentage ?? ""}
                                      onChange={(e) => { handlePayoutValueChange(e, "payout_fees") }}

                                    />
                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                      <span className="h-6" >%</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 py-3"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>




                      {
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="">
                            <tr>
                              <td scope="col" className="px-2 py-3  font-bold text-gray-900">
                                Wallets
                              </td>
                              <th scope="col" className=" py-3 text-start ">
                              </th>
                              <th scope="col" className="px-2 py-3 ">
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {(formValues?.wallet_ids?.length == 0 && formValues?.ewallet_New_addressess?.length == 0) &&
                              <tr>
                                <td scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                  <button
                                    className="text-indigo-500 " title="Add new wallet"
                                    onClick={() => {
                                      handleNewWallet("add_New_wallet", "")
                                    }}
                                  >
                                    Add wallet details

                                  </button>
                                </td>
                              </tr>
                            }

                            {formValues?.wallet_ids?.map((e_data: any, wIndex: number, wAA: any) => {

                              return <>
                                <tr className="bg-white dark:bg-gray-800">
                                  <td scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <p className="flex justify-start items-center">
                                      <input
                                        type={`${e_data?.is_verified ? "text" : "text"}`}
                                        id="wallet_address"
                                        className="block py-2.5 px-0 text-start w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        disabled={!e_data?.is_verified}
                                        // className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`${e_data?.is_verified ? "Enter wallet address" : "***********************"}`}
                                        value={e_data?.wallet_address ?? ""}
                                        onChange={(e) => { handleEwalletValueChange(e, e_data, "e_wallet_address") }}
                                      />

                                      {/* <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none"> */}
                                      {!e_data?.is_verified && <span className="h-6 mx-3" >
                                        <Button>

                                          <IoEyeOutline
                                            className="text-xl "
                                            onClick={() => {

                                              getProfile().then((data) => {
                                                let is_auth_2fa_activate = data[0]?.auth_2fa

                                                setIsOpenWalletAddress(true)

                                                setWallertVerifyIput((prev: any) => {
                                                  return {
                                                    ...prev,
                                                    wallet_id: e_data?.wallet_id,
                                                    is_auth_2fa_activate
                                                  }
                                                })

                                              }).catch((error) => {
                                                toast.error("something went wrong! please try after some time.")

                                              }).finally(() => {

                                              })

                                            }}
                                          />
                                        </Button>

                                      </span>}
                                      {/* </div> */}

                                    </p>
                                  </td>
                                  <td className="py-0">
                                    <div className="flex justify-center px-2">
                                      <div className="relative z-0  min-w-[100px]">
                                        <input
                                          type="number"
                                          id="percentage"
                                          disabled={!e_data?.is_verified}

                                          className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                          placeholder=" Fee "
                                          value={e_data?.percentage ?? ""}
                                          onChange={(e) => { handleEwalletValueChange(e, e_data, "e_wallet_percentage") }}

                                        />
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                          <span className="h-6" >%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4">
                                    <div className="flex items-start">
                                      <Button>


                                        <CiCircleMinus className="text-2xl font-bold mx-3 hover:text-red-700"


                                          onClick={() => {
                                            handleDiscardExistingWallets(e_data)
                                          }} />

                                      </Button>
                                      {" "}

                                      {(wAA?.length == (wIndex + 1) && formValues?.ewallet_New_addressess?.length == 0) &&
                                        <Button>

                                          <CiCirclePlus onClick={() => {
                                            handleNewWallet("add_New_wallet", "")
                                          }} className="text-2xl font-bold hover:text-green-500" />
                                        </Button>

                                      }

                                    </div>

                                  </td>
                                </tr>
                              </>
                            })}


                            {
                              formValues?.ewallet_New_addressess?.length > 0 ?
                                // addNewWallet?.length > 0 ?
                                formValues?.ewallet_New_addressess?.map((wallet_details: any, NewWalletIndex: number, newWalletArr: any) => {
                                  return <>

                                    <tr className="bg-white dark:bg-gray-800">
                                      <td scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <p className="flex justify-start items-center">

                                          <input
                                            type="text"
                                            id="wallet_address"
                                            // className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            className="block py-2.5 px-0 text-start w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                                            placeholder="Enter wallet address"
                                            value={wallet_details?.wallet_address ?? ""}
                                            onChange={(e) => { handleNewWalletValueChange(e, "", "e_wallet_address", NewWalletIndex) }}
                                          />

                                          <span className="h-6 mx-5" >

                                          </span>

                                        </p>
                                      </td>
                                      <td className="py-0">
                                        <div className="flex justify-center px-2">
                                          <div className="relative z-0  min-w-[100px]">
                                            <input
                                              type="number"
                                              id="percentage"
                                              className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                              placeholder=" Fee "
                                              value={wallet_details?.percentage ?? ""}
                                              onChange={(e) => { handleNewWalletValueChange(e, "", "e_wallet_percentage", NewWalletIndex) }}

                                            />
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 p-3 pb-5 pointer-events-none">
                                              <span className="h-6" >%</span>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-2 py-4">
                                        <div className="flex items-start">
                                          <Button>

                                            <CiCircleMinus className="text-2xl font-bold mx-3 hover:text-red-700" onClick={() => {
                                              handleNewWallet("remove_New_wallet", NewWalletIndex)

                                            }} />
                                          </Button>

                                          {" "}

                                          {(newWalletArr?.length == (NewWalletIndex + 1)) &&
                                            <Button>

                                              <CiCirclePlus onClick={() => {
                                                handleNewWallet("add_New_wallet", "")
                                              }} className="text-2xl font-bold hover:text-green-500" />
                                            </Button>

                                          }

                                        </div>

                                      </td>
                                    </tr>

                                  </>
                                })


                                : ""

                            }








                          </tbody>

                        </table>
                      }




                    </div>


                  </AccordionPanel>
                </AccordionItem>}
              </Accordion>


              <div className="mt-5 flex gap-2">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl bg-gray-100 px-3 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="linear rounded-xl bg-indigo-50 px-3 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : (
                    "Save"
                  )}
                </button>
                {addedgateways.filter((data) => data?.name === type).length >
                  0 &&
                  addedgateways.filter((data) => data?.name === type)[0]
                    ?.inputs && (
                    <DeleteClientGatewayModal
                      data={
                        addedgateways.filter((data) => data?.name === type)[0]
                      }
                      fetchClients={fetchClients}
                    />
                  )}
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal >

      <Modal isOpen={isOpenWalletAddress} onClose={onCloseWalletAddress}>
        <ModalOverlay className="bg-[#000]   !opacity-30 z-20" />
        <ModalContent className="!z-[1002] !m-auto   shadow !w-max min-w-[350px] !max-w-[85%] md:top-[12vh] ">

          <ModalBody className="">
            <Card extra="px-[30px] pt-[35px] pb-[20px] max-w-[450px] flex flex-col !z-[1004] ">
              {!wallertVerifyIput?.is_auth_2fa_activate ? <>
                <h1 className=" text-2xl font-bold">
                  {"2FA Verification"}
                </h1>
                <p className="opacity-50">To see the wallet address please verify 2FA code.</p>
                <br />

                <p className="">Your account does not meet the necessary requirements in order to see wallet address, please visit <Link href="/admin/profile">profile settings</Link> and activate 2FA code.</p>
                <div className="flex gap-2  mt-3 justify-end">
                  <button
                    onClick={onCloseWalletAddress}
                    className="linear rounded-xl bg-gray-100 px-3 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                  >
                    Close
                  </button>{" "}

                </div>
              </> :

                <>
                  <h1 className=" text-2xl font-bold">
                    {"2FA Verification"}
                  </h1>
                  <p className="opacity-50">To see the wallet address please verify 2FA code.</p>

                  <div className="w-72 bg-white">
                    <InputField
                      variant="auth"
                      extra="mt-3 w-full"
                      value={wallertVerifyIput?.password}
                      label="Password *"
                      placeholder="Enter password"
                      id="password"
                      type={`${wallertVerifyIput?.isShow ? "text" : "password"}`}
                      onChange={(e) => {
                        const name = e.target.id
                        const value = e.target?.value
                        setWallertVerifyIput((prev: any) => {
                          return {
                            ...prev,
                            [name]: value
                          }
                        })
                      }}

                      passwordShow={wallertVerifyIput?.isShow}
                      setPasswordShow={() => setWallertVerifyIput((prev: any) => {
                        return {
                          ...prev,
                          isShow: !prev?.isShow
                        }
                      })}


                    />

                  </div>
                  <div className="w-72">
                    <InputField
                      variant="auth"
                      extra="mt-3 w-full"
                      value={wallertVerifyIput?.passCode}

                      label="2FA Code *"
                      placeholder="Enter 2FA 6 digit code"
                      id="passCode"
                      type="number"


                      onChange={(e) => {
                        const name = e.target.id
                        const value = e.target?.value?.trim()
                        if (value?.length <= 6) {
                          setWallertVerifyIput((prev: any) => {
                            return {
                              ...prev,
                              [name]: value
                            }
                          })
                        }

                      }}


                    />
                  </div>
                  <div className="flex gap-2  mt-3 justify-end">
                    <button
                      onClick={onCloseWalletAddress}
                      className="linear rounded-xl bg-gray-100 px-3 py-2 text-base font-medium text-navy-700 outline-none transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"

                    >
                      Close
                    </button>{" "}
                    <button
                      className="linear rounded-xl bg-indigo-50 px-3 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                      onClick={() => {
                        handleVerifyWallet()
                      }}

                    >
                      Submit
                    </button>
                  </div>
                </>}
            </Card>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateClientGatewaysModal;

