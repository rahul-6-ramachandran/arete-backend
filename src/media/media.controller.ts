import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { Multer } from 'multer';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest: './uploads',
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.handleFileUpload(file);
   
  }
 


  @Post('test-lock')
testLock() {
  return this.mediaService.testLock();
}
  @Get('queue/stats')
  getQueueStats() {
  return this.mediaService.getQueueStats();
  }

  @Post('test-queue')
  testQueue() {
    return this.mediaService.queueTestJobs();
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }
}
