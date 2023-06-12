import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity'
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){  }

  async addEmployee(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async getAllEmployee() {
    return await this.employeeRepository.find({
      select:["id","name","email","department","address"],
      where:{isActive:true}
    });
  }

  async getEmployee(id: number) {
    return await this.employeeRepository.findOne({
      select:['id','name','email','department','address'],
      where:{id}
    });
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, updateEmployeeDto)
  }

  async removeEmployee (id: number) {
    await this.employeeRepository.softDelete(id);
    await this.employeeRepository.update(id,{isActive: false});
  }
}
