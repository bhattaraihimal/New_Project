import { HttpStatus } from "../config/httpStatusCodes.js";
import {
  employeeService,
  rolePermissionService,
  roleService,
} from "../services/index.js";
import cloudinary from "../utils/cloudinary.js";

export const createEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    const { name, contactNo, post, email } = req.body;

    // Check if required fields are provided
    if (!name || !contactNo || !post || !email) {
      return res
        .status(HttpStatus.BAD_REQUEST_400)
        .json({ error: "Please provide all the required information" });
    }

    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "employee",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to create an employee" });
    }

    let profilePic = req.body.images;

    if (req.file && req.file.path) {
      // Upload profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profilePic = uploadResult.secure_url;
    }

    // Create new employee
    const employee = await employeeService.createEmployeeService({
      name,
      contactNo,
      post,
      email,
      profilePic: profilePic,
      user_id: user_id,
    });
    res.json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const viewAllEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;

  try {
    // Fetch all employees
    const employees = await employeeService.getAllEmployeeService();
    res.json({ employees });
  } catch (error) {
    console.error("Error viewing employees:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const viewEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;

  try {
    const { id } = req.params;

    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "employee",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to view this employee" });
    }

    // Find employee by id
    const employee = await employeeService.getEmployeeByIdService(id);
    if (!employee) {
      return res
        .status(HttpStatus.NOTFOUND_404)
        .json({ error: "Employee not found" });
    }

    res.json({ employee });
  } catch (error) {
    console.error("Error viewing employee:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const viewUserEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "ads",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to view ads" });
    }

    // Fetch and return all ads created by the current user
    const employees = await employeeService.getEmployeeByUserIdService(user_id);
    res.json({ employees });
  } catch (error) {
    console.error("Error viewing employees:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    const { id } = req.params;
    const { name, contactNo, post, email, images } = req.body;

    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "employee",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to update employees" });
    }

    // Find employee by id
    const employee = await employeeService.getEmployeeByIdService(id);
    if (!employee) {
      return res
        .status(HttpStatus.NOTFOUND_404)
        .json({ error: "Employee not found" });
    }

    // Check if the user is a 'Super Admin' or if the ad was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title !== "Super Admin" && employee.user_id !== user_id) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({
          error:
            "Why are you trying to update others employee ??  You can not do that !!!",
        });
    }

    // Prepare data to send for updating
    const dataToUpdate = { name, contactNo, post, email, profilePic: images };

    // If a new profile picture is uploaded, update the profilePic field
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      dataToUpdate.profilePic = uploadResult.secure_url;
    }

    // Update employee using updateEmployeeService
    const response = await employeeService.updateEmployeeService(
      id,
      dataToUpdate
    );

    // Check response and send appropriate message
    if (response[0] > 0) {
      res
        .status(HttpStatus.SUCCESS_200)
        .json({ message: "Employee updated successfully" });
    } else {
      res
        .status(HttpStatus.BAD_REQUEST_400)
        .json({ message: "Update failed. No changes made." });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    const { id } = req.params;

    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "employee",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to delete employees" });
    }

    // Find employee by id
    const employee = await employeeService.getEmployeeByIdService(id);
    if (!employee) {
      return res
        .status(HttpStatus.NOTFOUND_404)
        .json({ error: "Employee not found" });
    }

    // Check if the user is a 'Super Admin' or if the employee was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title !== "Super Admin" && employee.user_id !== user_id) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({
          error:
            "Why are you trying to delete others employee. You can only delete employee that you have created !!!",
        });
    }

    // Delete employee
    await employeeService.deleteEmployeeByIdService(id);

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};

export const deleteAllEmployee = async (req, res) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    // Check if the user has the required permission
    const hasPermission =
      await rolePermissionService.getRolePermissionByIdService({
        role_id,
        requiredPermission: "employee",
      });
    if (!hasPermission) {
      return res
        .status(HttpStatus.FORBIDDEN_403)
        .json({ error: "You do not have permission to delete all employees" });
    }

    // Find all employees and delete them
    const employees = await employeeService.getAllEmployeeService();
    for (const employee of employees) {
      const userRole = await roleService.getRoleByIdService(role_id);
      if (userRole.title !== "Super Admin" && employee.user_id !== user_id) {
        continue;
      }

      await employeeService.deleteEmployeeByIdService(employee.id);
    }

    res.json({ message: "All employees deleted successfully" });
  } catch (error) {
    console.error("Error deleting all employees:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
      .json({ error: "Internal server error" });
  }
};
