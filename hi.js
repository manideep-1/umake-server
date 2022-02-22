import React, { Component } from "react";
import style from "./appStyle.module.css";
import axios from 'axios'
// import data from './data';

// const addon={
//     fontSize:'30px',
//     display:'block',
//     marginLeft:'auto',
//     marginRight:'auto',
//     width:'39%',
//     float:'right',
// }

//  const OrderDetails=data.OrderDetails;
// let date;
export default class OrdersBody extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      order:null,
      product:null,
      address:null     
    }
  }

  componentDidMount=()=>{
    let patharray = window.location.href.split('/')
    
    // let patharray=window.location.href.pathname.split('/')
    let id=patharray[patharray.length-1]
    console.log(id)
    axios.get(`http://localhost:3001/orders/orderinfo/${id}`)
    .then(res=>{
       this.setState({
         order:res.data.order,
         product:res.data.product,
         address:res.data.address
       })
       console.log(this.state)
    },()=>
    {
      console.log("hiiii")
      // if(this.state.order != null)
      // {
      //   let today=this.state.order.placedDate
      //   date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
      //   console.log(date)
      // }
    })
    .catch(error=>{
        console.log(error)
    })
}

  
  render() {
    let {order,product,address}=this.state
    console.log("hiiii")
      // if(this.state.order != null)
      // {
      //   let today=this.state.order.placedDate
      //   // date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()
      //   // console.log(date)
      //   date=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today)
      //   // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
      // }
    return (
      <div class={`${style.accOptions} "container"`}>
        {this.state.order==null?<p></p>:
        <div>
        <div class="row">
          <div class="col-md-7">
            <br></br>
            <span class={style.orderId}>Order:</span>
            <span class={style.orderIdval}>{order._id}</span>
          
        <span class={style.orderIdvalpadding}>{order.placedDate}</span>
            <span class={style.orderIdvalpadding}>Order Placed :</span>
            <div class={`${style.addbordertoorder}  ${style.orderscardcolor}`}>
              <img class={style.tshirtorder} src={require(`./tshirt6.jpg`)} alt=""/>
              <br></br>
              <span class={style.orderpadding}>
                {product.name}&nbsp;
              </span>
              <br></br>
              <span class={style.orderpadding}>Rs.349 | &nbsp; Size:{order.size}</span>
              <br></br>
              {/* <label class={style.labeldeliveryfailed}>Order Failed</label>  */}
              <label class={style.labeldeliverysuccess}>{order.status}</label>
              <div id={style.tracking}>
                <div id={style.bullet1}></div>
                <div id={style.bulletline1}></div>
                <div id={style.bullet2}></div>
                <div id={style.bulletline2}></div>
                <div id={style.bullet3}></div>
                <div id={style.bulletline3}></div>
                <div id={style.bullet4}></div>
                <div id={style.bulletline4}></div>
                <div id={style.bullet5}></div>
                <div id={style.confirmed}>Confirmed</div>
                <div id={style.readytoship}>Ready to Ship</div>
                <div id={style.shipped}>Shipped</div>
                <div id={style.outfordelivery}>Out For Delivery</div>
                <div id={style.delivered}>Delivered</div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class={`${style.adddetailsorderinfo}`}>
              <span class={style.shippingDetails}>Shipping Details</span>
              <br></br>
             <span class={style.shippingDetailsinfoname}>{address.receiversName}</span>
              <br></br>
              <span class={style.shippingDetailsinfo}>
                {address.address}, {address.landMark}, {address.locality}, {address.city},
                {address.pincode}, Telangana, India
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class={style.helpmarginset}>
              <div
                class={`${style.addbordertoorder}  ${style.ordersinfohelpsupport}`}
              >
                <br></br>
                <span class={style.helporder}>
                  Need Help With Your Order&nbsp;
                </span>
                <br></br>
                <div class={style.helporder}>
                  <button class="btn btn-outline-primary">
                    VISIT HELP AND SUPPORT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class={`${style.adddetailsorderinfo}`}>
              <div class="row">
                <div class="col-8">
                  <span class={style.shippingDetails}>Payment summary</span>
                  <br></br>
                </div>

                <div class="col-4"></div>
              </div>

              <div class="row">
                <div class="col-9">
                  <span class={style.paymentsummaryinfoname}>Cart Total</span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.paymentsummaryinfoname}>Rs.349</span>
                </div>
              </div>

              <div class="row">
                <div class="col-9">
                  <span class={style.paymentsummaryinfoname}>
                    Shipping Cost
                  </span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.paymentsummaryinfoname} id={style.free}>
                    FREE
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-9">
                  <span class={style.paymentsummaryinfoname}>COD</span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.paymentsummaryinfoname} id={style.free}>
                    FREE
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-9">
                  {" "}
                  <span class={style.paymentsummaryinfoname}>Order Total</span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.paymentsummaryinfoname}>Rs.349</span>
                </div>
              </div>

              <div class="row">
                <div class="col-9">
                  {" "}
                  <span class={style.paymentsummaryinfoname}>
                    Paid from Wallet
                  </span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.paymentsummaryinfoname}>Rs.175</span>
                </div>
              </div>
              <hr></hr>
              <div class="row">
                <div class="col-9">
                  {" "}
                  <span class={style.amountpaid}>Amount Paid</span>
                  <br></br>
                </div>
                <div class="col-3">
                  <span class={style.amountpaid}>Rs.174</span>
                </div>
              </div>

              <div class="row"></div>
            </div>
          </div>
        </div>
        </div>}
      </div>
    );
  }
}


