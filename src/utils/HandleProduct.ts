import {Product} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {showToast} from './showToast';

export class HandleProduct {
  static addToList = async (item: Product, count: number) => {
    const api = `/addToList`;

    let data = new FormData();
    data.append('product_id', item.id);
    data.append('qty', count);

    await handleGetData
      .handleProduct(api, data, 'post', true)
      .then((res: any) => {
        res.success && showToast('Added to list');
      })
      .catch(error => JSON.stringify(error));
  };
  static getProductsList = async () => {
    const api = `/listOfProducts`;

    await handleGetData
      .handleProduct(api)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
}
