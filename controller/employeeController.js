import { HttpStatus } from "../config/httpStatusCodes.js";
import { employeeService } from "../services/index.js";

export const createEmployee = async (req, res, next) => {
    try {
      const { name, contactNo, post, email, profilePic, user_id } = req.body;
  
      // Check if required fields are provided
      if (!name || !contactNo || !post || !email || !profilePic || !user_id) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new employee
      const employee = await employeeService.createEmployeeService({ name, contactNo, post, email, profilePic, user_id });
      res.json({ message: 'Employee created successfully'});
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllEmployee = async (req, res, next) => {
    try {
      const employees = await employeeService.getAllEmployeeService();
      res.json({ employees });
    } catch (error) {
      console.error('Error viewing employees:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewEmployee = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find ad by id
      const employee = await employeeService.getEmployeeByIdService(id);
      if (!employee) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Employee not found' });
      }
  
      res.json({ employee });
    } catch (error) {
      console.error('Error viewing employee:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const updateEmployee = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, contactNo, post, email, profilePic } = req.body;
  
      // Find employee by id
      const employee = await employeeService.getEmployeeByIdService(id);
      if (!employee) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Employee not found' });
      }
  
      // Update employee
      employee.name = name;
      employee.contactNo = contactNo;
      employee.post = post;
      employee.email = email;
      employee.profilePic = profilePic;
      await employee.save();
  
      res.json({ message: 'Employee updated successfully'});
    } catch (error) {
      console.error('Error updating ad:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const deleteEmployee = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find employee by id
      const employee = await employeeService.getEmployeeByIdService(id);
      if (!employee) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Employee not found' });
      }
  
      // Delete employee
      await employeeService.deleteEmployeeByIdService(id);
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const deleteAllEmployee = async (req, res) => {
    try {
      // Find all employee and delete them
      const employees = await employeeService.getAllEmployeeService();
      for (const employee of employees) {
        await employeeService.deleteAllEmployeeService();
      }
  
      res.json({ message: 'All employees deleted successfully' });
    } catch (error) {
      console.error('Error deleting all employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


