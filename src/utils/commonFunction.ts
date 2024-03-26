import sipe from "assets/img/payment-clients/sipe.png";
import pixLotus from "assets/img/payment-clients/pix.png";
import pix from "assets/img/payment-clients/pix.png";
import blumon from "assets/img/payment-clients/blumon.png";
import stripe from "assets/img/payment-clients/stripe.png";
import memphis from "assets/img/payment-clients/memphis.png";

import repyd from "assets/img/payment-clients/rapyd.png";
import mit from "assets/img/payment-clients/mit.png";
import reSet from "assets/img/payment-clients/reset.png";
import banwire from "assets/img/payment-clients/banwire.jpg";
import valitor from "assets/img/payment-clients/valitor.png";
import bambora from "assets/img/payment-clients/bambora.png";
import Scipiopay from "assets/img/payment-clients/Scipiopay.png";
import Betapay from "assets/img/payment-clients/Betapay.png";
import Aurea_via from "assets/img/payment-clients/Aurea_via.png";
import Kasha from "assets/img/payment-clients/Kasha.jpg";
import Visa from "assets/svg/card_type/visa.svg";
import MasterCard from "assets/svg/card_type/mastercard.svg";
import Discover from "assets/svg/card_type/discover.svg";
import Amex from "assets/svg/card_type/amex.svg";
import MaestroCard from "assets/svg/card_type/maestro.svg";
import DinersClub from "assets/svg/card_type/dinersclub.svg";
import JCB from "assets/svg/card_type/jcb.svg";
import UnionPay from "assets/svg/card_type/unionpay.svg";




export function getImage(name: string) {
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
  } else if (name === 'MIT') {
    return mit;
  } else if (name === 'Re-set') {
    return reSet;
  } else if (name === 'Bambora') {
    return bambora;
  }
  else if (name === 'Scipiopay') {
    return Scipiopay;
  }
  else if (name === 'Aurea Via') {
    return Aurea_via;
  }
  else if (name === 'Betapay') {
    return Betapay;
  } else if (name === 'Kasha') {
    return Kasha;
  }
 else if (name === 'Visa') {
  return Visa;
}
}


export function getCardSVG(name:string){
  switch (name) {
    case 'VISA':
      return Visa
    case 'MasterCard':
      return MasterCard
    case 'Discover':
      return Discover
    case 'Amex':
      return Amex
    case 'MaestroCard':
      return MaestroCard
    case 'DinersClub':
      return DinersClub
    case 'JCB':
      return JCB
    case 'UnionPay':
      return UnionPay
    default: return "-"
  }
}