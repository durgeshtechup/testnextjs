import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { updateGateway } from "api/gateways";
import { postUserPermission, updateUserPermission } from "api/role";
import Card from "components/card";
import Checkbox from "components/checkbox";
import DivLoader from "components/divloader/DivLoader";
import InputField from "components/fields/InputField";
import React from "react";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { MdEdit, MdInfo } from "react-icons/md";

const CreateRoleMethod = ({
  fetchRole,
  id,
  is_info,
  data,
  singleRoleData,
}: {
  fetchRole: () => void;
  id?: string;
  is_info?: boolean;
  data?: any;
  singleRoleData?: any;
}) => {
  const rootForm = { name: "" };

  const DashboardData = [
    "View dashboard header",
    "View dashboard recent transactions",
    "View dashboard approved transactions piechart",
    "View dashboard declined transactions piechart",
    "View dashboard approved transactions list",
    "View dashboard declined transactions list",
    "View dashboard wavechart",
    "View dashboard transaction anaylsis",
    "Show dashboard method name",
  ];

  const ClientData = [
    "View client list",
    "Add client",
    "View client",
    "Edit client",
    "Delete client",
    "Client gateway settings",
    "Client gateway routing",
    "Client show method name",
    "Client gateway pricing",
    "Client gateway settlement"
  ];
  const OrganizationData = [
    "View organization list",
    "Add organization",
    "View organization",
    "Edit organization",
    "Delete organization",
    "Organization show method name",
  ];

  const PaymentData = [
    "View payment list",
    "Refund payment list",
    "View payment response information",
    "View payment receipt",
    "Payment show method name",
    "Edit payment status"
  ];

  const TokenData = [
    "View token list",
    "Token show method name"
  ];

  const ApiData = [
    "Api access"
  ];
  const PayoutsData = [
    "View payout list",
    "View payout response information",
    "Payout show method name"
  ];
  const SuperAdminData = [
    "Super admin view"
  ];
  const UserData = [
    "View self created user",
    "View user list",
    "Add user",
    "View user",
    "Edit user",
    "Delete user",
  ];
  const PaymentMethodData = ["View payment method list", "Edit payment method", "Show payment method name"];
  const SubscriptionData = ["View Subscription list", "Subscription show method name"];
  const SettlementData = ["View Settlement list"];
  const RoleData = [
    "View role list",
    "Add role",
    "Edit role",
    "Delete role",
    "View role",
    "View super admin role permission"
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [formValues, setFormValues] = React.useState<any>(rootForm);
  const [viewMode, setViewMode] = React.useState<boolean>(is_info);
  const [selectedUser, setSelectedUser] = React.useState<any>([]);

  const [selectedPay, setSelectedPay] = React.useState<any>([]);
  const [selectedToken, setSelectedToken] = React.useState<any>([]);
  const [selectedPayouts, setSelectedPayouts] = React.useState<any>([]);
  const [selectedSuperAdmin, setSelectedSuperAdmin] = React.useState<any>([]);
  const [selectedClient, setSelectedClient] = React.useState<any>([]);
  const [selectedOrganization, setSelectedOrganization] = React.useState<any>(
    []
  );
  const [selectedPayMeth, setSelectedPayMeth] = React.useState<any>([]);
  const [selectedRole, setSelectedRole] = React.useState<any>([]);
  const [selecteSettlement, setSelecteSettlement] = React.useState<any>([]);
  const [selecteSubscription, setSelecteSubscription] = React.useState<any>([]);
  const [selectedDashboard, setSelectedDashboard] = React.useState<any>([]);
  const [formValuesErr, setFormValuesErr] = React.useState<any>(rootForm);

  const [selectedApi, setSelectedApi] = React.useState<any>([]);




  const handleClose = () => {
    setFormValues(rootForm);
    onClose();
    setViewMode(is_info)
  };

  function handleValueChange(e: any) {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setFormValuesErr({ ...formValuesErr, [e.target.id]: "" });
  }

  function validateData() {
    let escape_arr = [
      "statement_descriptor",
      "statement_descriptor_suffix",
      "business_name",
    ];

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
    if (validate) {
      try {
        setIsLoading(true);
        var data: any = {
          name: formValues?.name?.toUpperCase()?.trim(),
          payment_method: {
            view_payment_method_list: selectedPayMeth?.includes(
              "View payment method list"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            edit_payment_method: selectedPayMeth?.includes("Edit payment method") || selectedSuperAdmin?.includes("Super admin view"),
            show_payment_method_name: selectedPayMeth?.includes("Show payment method name") || selectedSuperAdmin?.includes("Super admin view"),
            // edit_payment_status: selectedPayMeth?.includes("Edit payment status"),

          },

          dashboard: {
            view_dashboard_header: selectedDashboard?.includes("View dashboard header") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_recent_transactions: selectedDashboard?.includes("View dashboard recent transactions") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_approved_transactions_piechart: selectedDashboard?.includes("View dashboard approved transactions piechart") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_declined_transactions_piechart: selectedDashboard?.includes("View dashboard declined transactions piechart") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_approved_transactions_list: selectedDashboard?.includes("View dashboard approved transactions list") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_declined_transactions_list: selectedDashboard?.includes("View dashboard declined transactions list") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_wavechart: selectedDashboard?.includes("View dashboard wavechart") || selectedSuperAdmin?.includes("Super admin view"),
            view_dashboard_transaction_anaylsis: selectedDashboard?.includes("View dashboard transaction anaylsis") || selectedSuperAdmin?.includes("Super admin view"),
            show_dashboard_method_name: selectedDashboard?.includes("Show dashboard method name") || selectedSuperAdmin?.includes("Super admin view"),
          },
          user: {
            view_user_list: selectedUser?.includes("View user list") || selectedSuperAdmin?.includes("Super admin view"),
            view_self_created_user: selectedUser?.includes("View self created user") || selectedSuperAdmin?.includes("Super admin view"),
            add_user: selectedUser?.includes("Add user") || selectedSuperAdmin?.includes("Super admin view"),
            view_user: selectedUser?.includes("View user") || selectedSuperAdmin?.includes("Super admin view"),
            edit_user: selectedUser?.includes("Edit user") || selectedSuperAdmin?.includes("Super admin view"),
            delete_user: selectedUser?.includes("Delete user") || selectedSuperAdmin?.includes("Super admin view"),

          },
          payment: {
            view_payment_list: selectedPay?.includes("View payment list") || selectedSuperAdmin?.includes("Super admin view"),
            refund_payment_list: selectedPay?.includes("Refund payment list") || selectedSuperAdmin?.includes("Super admin view"),
            view_payment_response_information: selectedPay?.includes(
              "View payment response information"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            view_payment_receipt: selectedPay?.includes("View payment receipt") || selectedSuperAdmin?.includes("Super admin view"),
            payment_show_method_name: selectedPay?.includes("Payment show method name") || selectedSuperAdmin?.includes("Super admin view"),
            edit_payment_status: selectedPay?.includes("Edit payment status") || selectedSuperAdmin?.includes("Super admin view"),
          },
          token: {
            view_token_list: selectedToken?.includes("View token list") || selectedSuperAdmin?.includes("Super admin view"),
            token_show_method_name: selectedToken?.includes("Token show method name") || selectedSuperAdmin?.includes("Super admin view"),
          },
          payout: {
            view_payout_list: selectedPayouts?.includes("View payout list") || selectedSuperAdmin?.includes("Super admin view"),
            view_payout_response_information: selectedPayouts?.includes(
              "View payout response information"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            payout_show_method_name: selectedPayouts?.includes("Payout show method name") || selectedSuperAdmin?.includes("Super admin view"),
          },
          super_admin: {
            super_admin_view: selectedSuperAdmin?.includes("Super admin view")
          },
          organization: {
            view_organization_list: selectedOrganization?.includes(
              "View organization list"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            add_organization:
              selectedOrganization?.includes("Add organization") || selectedSuperAdmin?.includes("Super admin view"),
            view_organization:
              selectedOrganization?.includes("View organization") || selectedSuperAdmin?.includes("Super admin view"),
            edit_organization:
              selectedOrganization?.includes("Edit organization") || selectedSuperAdmin?.includes("Super admin view"),
            delete_organization: selectedOrganization?.includes("Delete organization") || selectedSuperAdmin?.includes("Super admin view"),
            organization_show_method_name: selectedOrganization?.includes(
              "Organization show method name"
            ) || selectedSuperAdmin?.includes("Super admin view"),
          },
          client: {
            view_client_list: selectedClient?.includes("View client list") || selectedSuperAdmin?.includes("Super admin view"),
            add_client: selectedClient?.includes("Add client") || selectedSuperAdmin?.includes("Super admin view"),
            view_client: selectedClient?.includes("View client") || selectedSuperAdmin?.includes("Super admin view"),
            edit_client: selectedClient?.includes("Edit client") || selectedSuperAdmin?.includes("Super admin view"),
            delete_client: selectedClient?.includes("Delete client") || selectedSuperAdmin?.includes("Super admin view"),
            client_gateway_settings: selectedClient?.includes(
              "Client gateway settings"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            client_gateway_routing: selectedClient?.includes("Client gateway routing") || selectedSuperAdmin?.includes("Super admin view"),
            client_show_method_name: selectedClient?.includes("Client show method name") || selectedSuperAdmin?.includes("Super admin view"),
            client_gateway_pricing: selectedClient?.includes(
              "Client gateway pricing"
            ) || selectedSuperAdmin?.includes("Super admin view"),
            client_gateway_settlement: selectedClient?.includes(
              "Client gateway settlement"
            ) || selectedSuperAdmin?.includes("Super admin view"),
          },
          role: {
            view_role_list: selectedRole?.includes("View role list") || selectedSuperAdmin?.includes("Super admin view"),
            add_role: selectedRole?.includes("Add role") || selectedSuperAdmin?.includes("Super admin view"),
            edit_role: selectedRole?.includes("Edit role") || selectedSuperAdmin?.includes("Super admin view"),
            delete_role: selectedRole?.includes("Delete role") || selectedSuperAdmin?.includes("Super admin view"),
            view_role: selectedRole?.includes("View role") || selectedSuperAdmin?.includes("Super admin view"),
            view_super_admin_role_permission: selectedRole?.includes("View super admin role permission") || selectedSuperAdmin?.includes("Super admin view"),
          },
          subscription: {
            view_subscription_list: selecteSubscription?.includes("View Subscription list") || selectedSuperAdmin?.includes("Super admin view"),
            subscription_show_method_name: selecteSubscription?.includes("Subscription show method name") || selectedSuperAdmin?.includes("Super admin view"),
          },
          settlement: {
            view_role_list: selecteSettlement?.includes("View Settlement list") || selectedSuperAdmin?.includes("Super admin view"),
          },
          api: {
            api_access: selectedApi?.includes("Api access") || selectedSuperAdmin?.includes("Super admin view"),
          },
        };
        if (id) {
          await updateUserPermission(data, id);
        } else {
          await postUserPermission(data);
        }
        fetchRole();
        handleClose();
        window.location.reload()
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

  const initForm = () => {
    if (data) {
      //console.log("data", data);

      setFormValues(() => {
        return {
          name: data?.role_name,
        };
      });

      setSelectedClient(
        ClientData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.client?.value[key];
        })
      );
      setSelectedOrganization(
        OrganizationData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.organization?.value[key];
        })
      );
      setSelectedPay(
        PaymentData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.payment?.value[key];
        })
      );
      setSelectedToken(
        TokenData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.token?.value[key];
        })
      );
      setSelectedApi(
        ApiData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.api?.value[key];
        })
      );
      setSelectedPayouts(
        PayoutsData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.payout?.value[key];
        })
      );
      setSelectedSuperAdmin(
        SuperAdminData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.super_admin?.value[key];
        })
      );


      setSelectedUser(
        UserData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.user?.value[key];
        })
      );
      setSelectedPayMeth(
        PaymentMethodData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.payment_method?.value[key];
        })
      );
      setSelectedRole(
        RoleData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.role?.value[key];
        })
      );
      setSelecteSubscription(
        SubscriptionData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.subscription?.value[key];
        })
      );
      setSelecteSettlement(
        SettlementData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.settlement?.value[key];
        })
      );

      setSelectedDashboard(
        DashboardData?.filter((item) => {
          const key = item.toLowerCase().replace(/ /g, "_");
          return data?.dashboard?.value[key];
        })
      );
    }
  };

  const isAllSelectedUser =
    UserData?.length > 0 && selectedUser?.length === UserData?.length;
  const isAllSelectedPay =
    PaymentData?.length > 0 && selectedPay?.length === PaymentData?.length;
  const isAllSelectedToken =
    TokenData?.length > 0 && selectedToken?.length === TokenData?.length;
  const isAllSelectedApi =
    ApiData?.length > 0 && selectedApi?.length === ApiData?.length;

  const isAllSelectedPayouts =
    PayoutsData?.length > 0 && selectedPayouts?.length === PayoutsData?.length;

  const isAllSelectedSuperAdmin =
    SuperAdminData?.length > 0 && selectedSuperAdmin?.length === SuperAdminData?.length;


  const isAllSelectedClient =
    ClientData?.length > 0 && selectedClient?.length === ClientData?.length;

  const isAllSelectedOrganization =
    OrganizationData?.length > 0 &&
    selectedOrganization?.length === OrganizationData?.length;
  const isAllSelectedPayMeth =
    PaymentMethodData?.length > 0 &&
    selectedPayMeth?.length === PaymentMethodData?.length;
  const isAllSelecteRole =
    RoleData?.length > 0 && selectedRole?.length === RoleData?.length;
  const isAllSelecteSettlement =
    SettlementData?.length > 0 && selecteSettlement?.length === SettlementData?.length;
  const isAllSelecteSubscription =
    SubscriptionData?.length > 0 && selecteSubscription?.length === SubscriptionData?.length;
  const isAllSelectedDashboard =
    DashboardData?.length > 0 && selectedDashboard?.length === DashboardData?.length;

  const handleChange = (event: any) => {
    const { value, id } = event.target;

    if (value === "all") {
      if (id === "user") {
        setSelectedUser(
          selectedUser?.length === UserData?.length ? [] : UserData
        );
      } else if (id === "pay") {
        setSelectedPay(
          selectedPay?.length === PaymentData?.length ? [] : PaymentData
        );
      }
      else if (id === "token") {
        setSelectedToken(
          selectedToken?.length === TokenData?.length ? [] : TokenData
        );
      }
      else if (id === "api") {
        setSelectedApi(
          selectedApi?.length === ApiData?.length ? [] : ApiData
        );
      }
      else if (id === "payout") {
        setSelectedPayouts(
          selectedPayouts?.length === PayoutsData?.length ? [] : PayoutsData
        );
      }
      else if (id === "super_admin") {
        setSelectedSuperAdmin(
          selectedSuperAdmin?.length === SuperAdminData?.length ? [] : SuperAdminData
        );
      }


      else if (id === "client") {
        setSelectedClient(
          selectedClient?.length === ClientData?.length ? [] : ClientData
        );
      } else if (id === "org") {
        setSelectedOrganization(
          selectedOrganization?.length === OrganizationData?.length
            ? []
            : OrganizationData
        );
      } else if (id === "paymeth") {
        setSelectedPayMeth(
          selectedPayMeth?.length === PaymentMethodData?.length
            ? []
            : PaymentMethodData
        );
      } else if (id === "role") {
        setSelectedRole(
          selectedRole?.length === RoleData?.length ? [] : RoleData
        );
      } else if (id === "settlement") {
        setSelecteSettlement(
          selecteSettlement?.length === SettlementData?.length ? [] : SettlementData
        );
      } else if (id === "dashboard") {
        setSelectedDashboard(
          selectedDashboard?.length === DashboardData?.length ? [] : DashboardData
        );
      } else if (id === "subscription") {
        setSelecteSubscription(
          selecteSubscription?.length === SubscriptionData?.length ? [] : SubscriptionData
        );
      }
    } else if (value === "-1") {
      if (id === "user") {
        setSelectedUser([]);
      } else if (id === "pay") {
        setSelectedPay([]);
      }
      else if (id === "token") {
        setSelectedToken([]);
      }
      else if (id === "payout") {
        setSelectedPayouts([]);
      }
      else if (id === "super_admin") {
        setSelectedSuperAdmin([]);
      }
      else if (id === "api") {
        setSelectedApi([]);
      }

      else if (id === "client") {
        setSelectedClient([]);
      } else if (id === "org") {
        setSelectedOrganization([]);
      } else if (id === "paymeth") {
        setSelectedPayMeth([]);
      } else if (id === "role") {
        setSelectedRole([]);
      }
      else if (id === "subscription") {
        setSelecteSubscription([]);
      }
      else if (id === "settlement") {
        setSelecteSettlement([]);
      } else if (id === "dashboard") {
        setSelectedDashboard([]);
      }
    } else {
      if (id === "user") {
        if (selectedUser?.includes(value)) {
          setSelectedUser(
            selectedUser?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedUser([...selectedUser, value]);
        }
      } else if (id === "pay") {
        if (selectedPay?.includes(value)) {
          setSelectedPay(
            selectedPay?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedPay([...selectedPay, value]);
        }
      }
      else if (id === "token") {
        if (selectedToken?.includes(value)) {
          setSelectedToken(
            selectedToken?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedToken([...selectedToken, value]);
        }
      }
      else if (id === "api") {
        if (selectedApi?.includes(value)) {
          setSelectedApi(
            selectedApi?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedApi([...selectedApi, value]);
        }
      }
      else if (id === "payout") {
        if (selectedPayouts?.includes(value)) {
          setSelectedPayouts(
            selectedPayouts?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedPayouts([...selectedPayouts, value]);
        }
      }
      else if (id === "super_admin") {
        if (selectedSuperAdmin?.includes(value)) {
          setSelectedSuperAdmin(
            selectedSuperAdmin?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedSuperAdmin([...selectedSuperAdmin, value]);
        }
      }


      else if (id === "client") {
        if (selectedClient?.includes(value)) {
          setSelectedClient(
            selectedClient?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedClient([...selectedClient, value]);
        }
      } else if (id === "org") {
        if (selectedOrganization?.includes(value)) {
          setSelectedOrganization(
            selectedOrganization?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedOrganization([...selectedOrganization, value]);
        }
      } else if (id === "paymeth") {
        if (selectedPayMeth?.includes(value)) {
          setSelectedPayMeth(
            selectedPayMeth?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedPayMeth([...selectedPayMeth, value]);
        }
      } else if (id === "role") {
        if (selectedRole?.includes(value)) {
          setSelectedRole(
            selectedRole?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedRole([...selectedRole, value]);
        }
      } else if (id === "subscription") {
        if (selecteSubscription?.includes(value)) {
          setSelecteSubscription(
            selecteSubscription?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelecteSubscription([...selecteSubscription, value]);
        }
      }

      else if (id === "settlement") {
        if (selecteSettlement?.includes(value)) {
          setSelecteSettlement(
            selecteSettlement?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelecteSettlement([...selecteSettlement, value]);
        }
      } else if (id === "dashboard") {
        if (selectedDashboard?.includes(value)) {
          setSelectedDashboard(
            selectedDashboard?.filter((data: any) => {
              return data !== value;
            })
          );
        } else {
          setSelectedDashboard([...selectedDashboard, value]);
        }
      }
    }
  };

  return (
    <>
      {is_info ? (
        singleRoleData?.[0]?.role?.value?.view_role && (
          <div
            onClick={() => {
              if (data) {
                initForm();
              }
              onOpen();
            }}
          >
            <MdInfo
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="View"
            />
          </div>
        )
      ) : id ? (
        singleRoleData?.[0]?.role?.value?.edit_role && (
          <div
            onClick={() => {
              if (data) {
                initForm();
              }
              onOpen();
            }}
          >
            <MdEdit
              className="h-5 w-5 cursor-pointer text-indigo-500"
              title="Edit"
            />
          </div>
        )
      ) : singleRoleData?.[0]?.role?.value?.add_role ? (
        <div
          onClick={() => {
            if (data) {
              initForm();
            }
            onOpen();
          }}
        >
          <Card extra="w-fit px-5 cursor-pointer">
            <button className="flex items-center justify-center gap-2 whitespace-nowrap p-5 text-navy-700 outline-none dark:text-gray-200">
              <BsPlusCircle className="h-5 w-5 text-brand-500" /><span className="text-brand-500"> Create Role</span>
            </button>
          </Card>
        </div>
      ) : null}
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        {/* <ModalContent className="top-[12vh] !z-[1002] !m-auto sm:my-8 sm:w-full sm:max-w-lg lg:max-w-3xl md:top-[11vh]"> */}
        <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra=" max-w-[800px]  flex flex-col !z-[1004]">
              <h1 className="p-5 px-[30px] text-2xl font-bold">
                {viewMode ? "View" : id ? "Update Role" : "Create Role"}
              </h1>
              {viewMode && (
                <MdEdit
                  className="absolute right-7 top-5 h-6 w-6 cursor-pointer text-indigo-500"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                />
              )}
              {/* <div className="max-h-[calc(100vh-300px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1"> */}
              <div className="sm:max-h-[calc(100vh-300px)] max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden px-[30px] scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                {/* <div className="w-full">
                  <div className="flex gap-8">
                    <div className="flex gap-2">
                      <label
                        className={`ml-1.5 mr-3 text-sm font-medium text-navy-700 dark:text-white`}
                      >
                        Role Name
                      </label>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <select
                      id="is_active"
                      value={formValues?.is_active}
                      // onChange={handleValueChange}
                      className="mt-1 flex h-12 w-full items-center justify-center rounded-xl border  bg-white/0 p-3 text-sm text-gray-700 outline-none dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    >
                      <option value="">Select User</option>
                      {userData?.map((data:any) => {return(
                      <option value={data?.id}>{data?.first_name + " " + data?.last_name}</option>
                      )})}
                    </select>
                  </div>
                </div> */}
                <InputField
                  variant="auth"
                  extra="mb-1"
                  label="Role Name*"
                  placeholder="Role Name"
                  id="name"
                  disabled={viewMode}
                  type="text"
                  value={formValues?.name ?? ""}
                  state={formValuesErr?.name ? "error" : ""}
                  onChange={handleValueChange}
                />


                {
                  singleRoleData?.[0]?.role?.value?.view_super_admin_role_permission &&

                  <div className="mx-1 m-3 mt-5 max-w-full overflow-hidden rounded-xl bg-white  border">
                    <div className="p-0">
                      {/* <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                      <Checkbox
                        id="super_admin"
                        value={isAllSelectedSuperAdmin ? -1 : "all"}
                        checked={isAllSelectedSuperAdmin}
                        onChange={handleChange}
                        disabled={viewMode}
                        color={viewMode ? "gray" : ""}
                      />

                      <h2 className=" font-lg text-base text-navy-700">
                        Super Admin
                      </h2>
                    </div> */}
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {SuperAdminData?.map((data, index) => {
                          return (
                            <div className=" flex gap-2">
                              <Checkbox
                                id="super_admin"
                                value={data}
                                checked={selectedSuperAdmin.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>}
                <div className="mb-4 grid grid-cols-1 gap-1 md:grid-cols-2">

                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="dashboard"
                          value={isAllSelectedDashboard ? -1 : "all"}
                          checked={isAllSelectedDashboard}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Dashboard
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {DashboardData?.map((data, index) => {
                          /*console.log(
                            "1111",
                            data,
                            selectedClient.indexOf(data),
                            selectedClient?.filter((i1: any) => i1 === data),
                            selectedClient
                          );*/

                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="dashboard"
                                value={data}
                                checked={selectedDashboard.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data === "Show dashboard method name" ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : data.replace("dashboard", "").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}


                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="client"
                          value={isAllSelectedClient ? -1 : "all"}
                          checked={isAllSelectedClient}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Client
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {ClientData?.map((data, index) => {
                          /*console.log(
                            "1111",
                            data,
                            selectedClient.indexOf(data),
                            selectedClient?.filter((i1: any) => i1 === data),
                            selectedClient
                          );*/

                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="client"
                                value={data}
                                checked={selectedClient.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data === "Client show method name" ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="org"
                          value={isAllSelectedOrganization ? -1 : "all"}
                          checked={isAllSelectedOrganization}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Organization
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {OrganizationData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="org"
                                value={data}
                                checked={
                                  selectedOrganization.indexOf(data) > -1
                                }
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data == "Organization show method name" ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="pay"
                          value={isAllSelectedPay ? -1 : "all"}
                          checked={isAllSelectedPay}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Transaction
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {PaymentData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="pay"
                                value={data}
                                checked={selectedPay.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {
                                  data == "Payment show method name"
                                    ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                    : data == "View payment list"
                                      ? "View transaction list".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                      : data == "Refund payment list"
                                        ? "Refund transaction list".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                        : data == "Edit payment status"
                                          ? "Edit transaction status".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                          : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                }
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="user"
                          value={isAllSelectedUser ? -1 : "all"}
                          checked={isAllSelectedUser}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          User
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {UserData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="user"
                                value={data}
                                checked={selectedUser.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="paymeth"
                          value={isAllSelectedPayMeth ? -1 : "all"}
                          checked={isAllSelectedPayMeth}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Gateway
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {PaymentMethodData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="paymeth"
                                value={data}
                                checked={selectedPayMeth.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {
                                  data == "View payment method list"
                                    ? "View gateway list".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                    : data == "Show payment method name"
                                      ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                      : data == "Edit payment method"
                                        ? "Edit gateway".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                                        : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

                                }
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="role"
                          value={isAllSelecteRole ? -1 : "all"}
                          checked={isAllSelecteRole}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Role
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {RoleData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="role"
                                value={data}
                                checked={selectedRole.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="subscription"
                          value={isAllSelecteSubscription ? -1 : "all"}
                          checked={isAllSelecteSubscription}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Subscription
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {SubscriptionData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="subscription"
                                value={data}
                                checked={selecteSubscription.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data == "Subscription show method name" ?
                                  "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) :
                                  data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="settlement"
                          value={isAllSelecteSettlement ? -1 : "all"}
                          checked={isAllSelecteSettlement}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Settlement
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {SettlementData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="settlement"
                                value={data}
                                checked={selecteSettlement.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="token"
                          value={isAllSelectedToken ? -1 : "all"}
                          checked={isAllSelectedToken}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Token
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {TokenData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="token"
                                value={data}
                                checked={selectedToken.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data == "Token show method name" ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  </div>

                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="payout"
                          value={isAllSelectedPayouts ? -1 : "all"}
                          checked={isAllSelectedPayouts}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          Payout
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {PayoutsData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="payout"
                                value={data}
                                checked={selectedPayouts.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data == "Payout show method name" ? "Show gateway name".replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mx-1 mt-8 max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="p-0">
                      <div className="flex gap-2 bg-indigo-50 p-2 px-4">
                        <Checkbox
                          id="api"
                          value={isAllSelectedApi ? -1 : "all"}
                          checked={isAllSelectedApi}
                          onChange={handleChange}
                          disabled={viewMode}
                          color={viewMode ? "gray" : ""}
                        />

                        <h2 className=" font-lg text-base text-navy-700">
                          API
                        </h2>
                      </div>
                      <div className="max-h-72 overflow-auto overflow-x-hidden px-6 px-[30px] py-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1">
                        {ApiData?.map((data, index) => {
                          return (
                            <div className="mt-3 flex gap-2">
                              <Checkbox
                                id="api"
                                value={data}
                                checked={selectedApi.indexOf(data) > -1}
                                onChange={handleChange}
                                disabled={viewMode}
                                color={viewMode ? "gray" : ""}
                              />
                              <p className="font-medium text-navy-600">
                                {data?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  </div>
                </div>
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
                  disabled={viewMode}
                  // disabled={id ? false : true}
                  className="linear rounded-xl bg-indigo-50 px-5 py-2 text-base font-medium text-indigo-500 outline-none transition duration-200 hover:bg-indigo-600/5 active:bg-indigo-700/5 dark:bg-indigo-400/10 dark:text-white dark:hover:bg-indigo-300/10 dark:active:bg-indigo-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-indigo-500" />
                  ) : is_info || id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateRoleMethod;
