import { HttpStatus } from "../config/httpStatusCodes.js";
import { orderService, userProductStatusService, rolePermissionService, roleService } from "../services/index.js";

export const createOrder = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
    const { user_id, product_id, paid, active } = req.body;

    if (!user_id || !product_id || !paid || !active) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_create' });

    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create order' });
    }

    // Create new order
    const order = await orderService.createOrderService({ user_id, product_id, paid, active });

    // Check if order creation was successful
    if (!order) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to create order' });
    }

    // Create role UserProductStatus
    const userProductStatus = await userProductStatusService.createUserProductStatusService({
      
      
      
      product_id,
      user_id, 
      active
    });

    // Check if User Product Status creation was successful
    if (!userProductStatus) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to create user product status' });
    }

    res.status(HttpStatus.SUCCESS_200).json({ message: 'Order and User Product Status created successfully'});
  } catch (error) {
    console.error('Error creating order and user product status:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const viewAllOrders = async (req, res, next) => {
  const role_id =  res.locals.role_id

try {
  // Check if the user has the required permission
  const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_viewAll' });
  if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view all orders' });
  }

  // Fetch and return all orders
  const orders = await orderService.getAllOrderService();
  res.json({ orders });
} catch (error) {
  console.error('Error viewing orders:', error);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};

export const viewOrder = async (req, res, next) => {
  const role_id =  res.locals.role_id

try {
    const { id } = req.params;

   
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_view' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view this order' });
    }

    // Find order by id
    const order = await orderService.getOrderByIdService(id);
    if (!order) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Order not found' });
    }

    res.json({ order });
} catch (error) {
    console.error('Error viewing order:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};

// export const updateOrder = async (req, res, next) => {
//   const role_id =  res.locals.role_id

// try {
//     const { id } = req.params;
//     const { paid, active } = req.body;

//     // Check if the user has the required permission
//     const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_update' });
//     if (!hasPermission) {
//         return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update this order' });
//     }

//     // Find order by id
//     const order = await orderService.getOrderByIdService(id);
//     if (!order) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Order not found' });
//     }

//     // Prepare data to send for updating
//     const dataToUpdate = { paid, active };

//     // Update order using updateOrderService
//     let response = await orderService.updateOrderService(id, dataToUpdate);

//     if(!response[0] > 0){
//       return res.status(HttpStatus.BAD_REQUEST_400).json({error: 'Failed to update Order'});
//     }

//     // Update UserProductStatus

//     // Find User Product Status by id
//     const userProductStatus = await userProductStatusService.getUserProductStatusByIdService(id);
//     if (!userProductStatus) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User Product Status not found' });
//     }

//     // Prepare data to send for updating
//     const statusdataToUpdate = { active };

//     let statusresponse = await userProductStatusService.updateUserProductStatusService(id, statusdataToUpdate);

//     // check is userProductStatus updation was successful
//     if(!statusresponse){
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to update User Product Status'});
//         }

//         res.status(HttpStatus.SUCCESS_200).json({ message: 'Order and User Product Status updated successfully' });
//     } 
//  catch (error) {
//     console.error('Error updating order and User Product Status:', error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
// }
// };

export const updateOrder = async (req, res, next) => {
  const role_id = res.locals.role_id;

  try {
    const { id } = req.params;
    const { paid, active } = req.body;

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_update' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update this order' });
    }

    // Find order by id
    const order = await orderService.getOrderByIdService(id);
    if (!order) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Order not found' });
    }

    // Prepare data to send for updating
    const dataToUpdate = { paid, active };

    // Update order using updateOrderService
    let response = await orderService.updateOrderService(id, dataToUpdate);
    if (!(response[0] > 0)) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to update Order' });
    }

    // Get product_id and user_id from the order
    const { product_id, user_id } = order;

    // Find User Product Status by product_id and user_id
    const userProductStatus = await userProductStatusService.getUserProductStatusByProductAndUserIdService({ product_id, user_id });
    if (!userProductStatus) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User Product Status not found' });
    }

    // Prepare data to send for updating
    const statusDataToUpdate = { active };

    let statusResponse = await userProductStatusService.updateUserProductStatusService(userProductStatus.id, statusDataToUpdate);

    // Check if User Product Status update was successful
    if (!statusResponse) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to update User Product Status' });
    }

    res.status(HttpStatus.SUCCESS_200).json({ message: 'Order and User Product Status updated successfully' });
  } catch (error) {
    console.error('Error updating order and User Product Status:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const deleteOrder = async (req, res, next) => {
  const role_id =  res.locals.role_id

try {
    const { id } = req.params;

 
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_delete' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete this order' });
    }

    // Find order by id
    const order = await orderService.getOrderByIdService(id);
    if (!order) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Order not found' });
    }

    // Delete Order
    await orderService.deleteOrderByIdService(id);

    res.json({ message: 'Order deleted successfully' });
} catch (error) {
    console.error('Error deleting order:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};

export const deleteAllOrders = async (req, res) => {
  const role_id =  res.locals.role_id

try {
    
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'order_deleteAll' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all orders' });
    }

    // Find all orders and delete them
    const orders = await orderService.getAllOrderService();
    for (const order of orders) {
        await orderService.deleteOrderByIdService(order.id);
    }

    res.json({ message: 'All orders deleted successfully' });
} catch (error) {
    console.error('Error deleting all orders:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};




   
