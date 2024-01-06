import {Product} from '../Models/Product';
import handleGetData from '../apis/productAPI';
import {showToast} from './showToast';

export class HandleProduct {
  static addToList = async (
    item: Product,
    count: number,
    shop_id: number,
    scan_barcode?: boolean,
  ) => {
    const api = `/addProductToList`;

    let data = new FormData();
    data.append('product_id', item.id);
    data.append('qty', count);
    data.append('shop_id', shop_id);
    data.append('scan_barcode', scan_barcode ? 1 : 0);

    await handleGetData
      .handleProduct(api, data, 'post', true)
      .then((res: any) => {
        console.log(res);
        res.success && showToast('Added to list');
      })
      .catch(error => JSON.stringify(error));
  };
  static getProductsList = async () => {
    const api = `/listOfProductsCategorywise`;

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
