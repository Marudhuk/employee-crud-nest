import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

const userId=1;

@Controller('employee')
@ApiTags('Employee')


export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('addEmployee')
  async addEmployee(@Req() req:Request,@Res() res:Response ,@Body() createEmployeeDto: CreateEmployeeDto) {
    try{
      createEmployeeDto['createdBy'] = userId;
      await this.employeeService.addEmployee(createEmployeeDto);
      res.status(HttpStatus.OK).json({
        message:"Employee added successfully"
      })
    }catch(err){
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Employee could not be added"
      })      
    }
  }

  @Get('getAllEmployees')
  async getAllEmployee(@Req() req:Request,@Res() res:Response) {
    try{
      let employees=await this.employeeService.getAllEmployee();
      res.status(HttpStatus.OK).json({
        message:"Employees fetched successfully",
        data: employees
      })
    }catch(err){
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Could not find any employees"
      }) 
      
    }

  }

  @Get('getEmployee/:id')
  async getEmployee(@Req() req:Request,@Res() res:Response,@Param('id') id: number) {
    try{
      let employee=await this.employeeService.getEmployee(id);
      res.status(HttpStatus.OK).json({
        message:"Employee fetched successfully",
        data: employee
      })
    }catch(err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Could not find employee"
      })
      
    }
  }

  @Put('updateEmployee/:id')
  async updateEmployee(@Req() req:Request,@Res() res:Response,@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try{
      await this.employeeService.updateEmployee(id, updateEmployeeDto);
      res.status(HttpStatus.OK).json({
        message:"Updated employee successfully"
      })
      }catch(err){
        console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message:"Could not update"
        })
      }
    }
  
  @Delete('deleteEmployee/:id')
  async removeEmployee(@Req() req:Request,@Res() res:Response,@Param('id') id: number) {
    try{
      await this.employeeService.removeEmployee(id);
      res.status(HttpStatus.OK).json({
        message:"Deleted employee successfully"
      });
    }catch(err){
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Could not delete employee"
      })
    }
  }
}

