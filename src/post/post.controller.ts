
import { Controller, Delete, Get, Patch, Post, Body, Req, UseGuards, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('posts')
@UseGuards(AuthGuard('jwt')) //Apply Auth guard to all routes?'
export class PostController {
  

  constructor(private postService: PostService) {}

  
  @Get('all')
  getAll(@Req() req: Request) {
    const user = req.user as { id: number; email: string };
    return this.postService.getAll(user.id)
  }
 
  @Post()
  createPost(@Req() req: Request, @Body() dto: PostDto) {
    return this.postService.createPost(req.user, dto);
  }


  @Patch(':postId')
  updatePost(@Body() dto: PostDto, @Req() req: Request, @Param('postId', ParseIntPipe) postId: number) {
    const user = req.user as { id: number; email: string };
    return this.postService.updatePost(user.id, postId, dto);
  }

  
  @Delete(':postId')
  deletePost(@Req() req: Request, @Param('postId', ParseIntPipe) postId: number) {
    const user = req.user as { id: number; email: string };
    return this.postService.deletePost(user.id, postId);
  }
}
