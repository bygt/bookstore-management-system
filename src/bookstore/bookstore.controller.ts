import { Controller, Get, UseGuards, Post, Body, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Permission } from '../guards/permission.decorator';
import { QueryBookstoreDto } from './dto/query_bookstore.dto';
import { BookstoreService } from './bookstore.service';
import { UpdateBookstoreDto } from './dto/update_bookstore.dto';
import { CustomError } from '../utils/error-handler.util';
import { AddBookstoreDto } from './dto/add_bookstore.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiBody ,ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('bookstore') 
@Controller('bookstore')
@UseGuards(JwtAuthGuard, RoleGuard)
export class BookstoreController {
  constructor(private bookstoreService: BookstoreService) {}

  @Post('/list')
  @Permission('get')
  @ApiOperation({ summary: 'Get a list of bookstores' })
  @ApiResponse({ status: 200, description: 'Successfully fetched the bookstore list' })
  @ApiResponse({ status: 400, description: 'Unexpected error' })
  @ApiBody({ type: QueryBookstoreDto })
  @ApiBearerAuth()
  async list(@Body() queryBookstoreDto: QueryBookstoreDto) {
    try {
      const storeList = this.bookstoreService.list(queryBookstoreDto);

      return {
        success: true,
        data: storeList,
      };
    } catch (error) {
      CustomError('Unexpected error.', 400);
    }
  }

  @Get('/info/:id')
  @Permission('get')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get info about a specific bookstore' })
  @ApiResponse({ status: 200, description: 'Bookstore found' })
  @ApiResponse({ status: 404, description: 'Bookstore not found' })
  async info(@Param('id') id: number ) {
    try {
      
      const storeInfo = await this.bookstoreService.findById(id);

      return {
        success: true,
        data: storeInfo,
        total_books: storeInfo.books.length,
      };
    } catch (error) {
      CustomError('Unexpected error.', 400);
    }
  }
  
  @Post('/add')
  @UseGuards(RoleGuard)
  @Permission('add')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new bookstore' })
  @ApiResponse({ status: 201, description: 'Successfully added a bookstore' })
  @ApiResponse({ status: 400, description: 'Failed to add bookstore' })
  @ApiBody({ type: AddBookstoreDto })
  async add(@Body() addBookstoreDto: AddBookstoreDto) {
    try {
      const newStore = await this.bookstoreService.add(addBookstoreDto);
      return {
        success: true,
        data: newStore,
      };
    } catch (error) {
      CustomError('Bookstore add failed', 400);
    }
  }

  @Post('/update')
  @Permission('add') //manager can not update store fields
  @ApiOperation({ summary: 'Update bookstore details' })
  @ApiResponse({ status: 200, description: 'Successfully updated bookstore' })
  @ApiResponse({ status: 400, description: 'Failed to update bookstore' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateBookstoreDto })
  async update(@Body() updateBookstoreDto: UpdateBookstoreDto) {
    try {
      const updatedStore =
        await this.bookstoreService.update(updateBookstoreDto);
      return {
        success: true,
        data: updatedStore,
      };
    } catch (error) {
      CustomError('Bookstore update failed', 400);
    }
  }

  @Post('/delete')
  @Permission('delete')
  @ApiOperation({ summary: 'Delete a bookstore' })
  @ApiResponse({ status: 200, description: 'Successfully deleted bookstore' })
  @ApiResponse({ status: 400, description: 'Failed to delete bookstore' })
  @ApiBearerAuth()
  @ApiBody({ type: Number })
  async delete(@Body('id') id: number) {
    try {
      const deleted = this.bookstoreService.delete(id);
      return deleted;
    } catch (error) {
      CustomError('Bookstore delete failed', 400);
    }
  }
}
