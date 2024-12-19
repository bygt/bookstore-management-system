import { UpdateBookDto } from './dto/update_book.dto';
import { AddBookDto } from './dto/add_book.dto';
import { Controller, Get, UseGuards, Post, Body, Query, Req , Request} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Permission } from '../guards/permission.decorator';
import { BookService } from './book.service';
import { CustomError } from '../utils/error-handler.util';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('book') 
@Controller('book')
@UseGuards(JwtAuthGuard, RoleGuard)
export class BookController {
    constructor(private bookService: BookService) {}

    @Post('/list')
    @Permission('get')
    @ApiOperation({ summary: 'List books by name' })
    @ApiResponse({ status: 200, description: 'Books found' })
    @ApiResponse({ status: 404, description: 'Books not found' })
    @ApiBearerAuth()
    @ApiBody({ type: Number })
    async list(@Body() data: { book_name: string }) {
        try {
          const bookList = this.bookService.list(data.book_name);
    
          return {
            success: true,
            data: bookList,
          };
        } catch (error) {
          CustomError('Unexpected error.', 400);
        }
    }

    @Post('/info')
    @Permission('get')
    @ApiOperation({ summary: 'Get information about a specific book' })
    @ApiResponse({ status: 200, description: 'Successfully fetched book info' })
    @ApiResponse({ status: 400, description: 'Unexpected error' })
    @ApiBearerAuth()
    @ApiBody({ type: String })
    async info(@Body() data: { book_name: string }) {
        try {
          const bookInfo = await this.bookService.info(data.book_name);
    
          return {
            success: true,
            data: bookInfo,
          };
        } catch (error) {
          CustomError('Unexpected error.', 400);
        }
    }

    @Post('/add')
    @Permission('add')
    @ApiOperation({ summary: 'Add a new book' })
    @ApiResponse({ status: 200, description: 'Book added successfully' })
    @ApiResponse({ status: 400, description: 'Unexpected error' })
    @ApiBearerAuth()
    @ApiBody({ type: AddBookDto })
    async add(@Body() data: AddBookDto, @Req() req: {user: {roleId: number}}) {
        const roleId = req.user.roleId;
        try {
          const newBook = await this.bookService.add(data, roleId);
          return {
            success: true,
            data: newBook,
          };
        } catch (error) {
          CustomError('Book add failed', 400);
        }
    }

    @Post('/update')
    @Permission('update')
    @ApiOperation({ summary: 'Update a book' })
    @ApiResponse({ status: 200, description: 'Book updated successfully' })
    @ApiResponse({ status: 400, description: 'Unexpected error' })
    @ApiBearerAuth()
    @ApiBody({ type: UpdateBookDto })
    async update(@Body() data: UpdateBookDto, @Req() req: {user: {roleId: number}}) {
        const roleId = req.user.roleId;
        try {
          const updatedBook = await this.bookService.update(data, roleId);
          return {
            success: true,
            data: updatedBook,
          };
        } catch (error) {
          CustomError('Book update failed', 400);
        }
    }

    @Post('/delete')
    @Permission('delete')
    @ApiOperation({ summary: 'Delete a book' })
    @ApiResponse({ status: 200, description: 'Book deleted successfully' })
    @ApiResponse({ status: 400, description: 'Unexpected error' })
    @ApiBearerAuth()
    @ApiBody({ type: Number })
    async delete(@Body('id') id: number, @Req() req: {user: {roleId: number}}) {
        const roleId = req.user.roleId;
        try {
          const message = await this.bookService.delete(id);
          return {
            success: true,
            data: message,
          };
        } catch (error) {
          CustomError('Book delete failed', 400);
        }
    }
}
