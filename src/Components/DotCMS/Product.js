import React, { Component } from 'react';


export default class Product extends Component {


    render() {

        return (

            <div class="box-product box-product-modern">
                {this.props.salePrice !=null && <span class="badge badge-primary">Sale</span>}
                <div class="box-product-body">
                    <div class="box-product-button">
                        <a class="button button-sm button-primary" href="/store/cart">Add to cart</a>
                        <a class="button button-sm button-gray-400" href="/store/products/{this.props.urlTitle}">View details</a>
                    </div>
                    <div class="img-wrapper"><img class="box-product-img" src={'/dA/' + this.props.identifier + '/image1/189h/50q/' + this.props.title} alt={this.props.title}/></div>
                </div>
                <p class="box-product-name"><a href={'/store/products/' + this.props.urlTitle}>{this.props.title}</a></p>
                <div class="box-product-prices">
                {this.props.salePrice !=null ?
                        <div >
                            <span class="current-price sale-price">{this.props.salePrice}</span>
                            <span class="original-price">{this.props.retailPrice}</span>
                        </div>
                    :
                        <span class="current-price">{this.props.retailPrice}</span>
                }
                </div>
            </div>

        );
    }
}
