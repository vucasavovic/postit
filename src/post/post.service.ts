import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number){
      try {
        const posts = await this.prisma.post.findMany({
          where:{
            userId
          },
          select: {
            id: true,    // Select only the id
            title: true,
            postContent:true,
            createdAt:true,
            updatedAt: true  
          },
        })

        if(posts.length==0){
          throw new NotFoundException("User doesn't have any posts!");
        }

        
        return posts;

      } catch (error) {
        return {message: error.message}
      }
  }

  async createPost(user: any, dto: PostDto) {
    console.log(user)
    try {
      const post = await this.prisma.post.create({
        data: {
          userId:user.id,
          title: dto.title,
          postContent: dto.content
        },
      });

      return 'Posted!'

    } catch (error) {
      return {message: error.message}
    }
  }

  
  async updatePost(userId: number, postId: number, data: PostDto){
      try {
        const post = await this.prisma.post.findUnique({
          where: { id: postId },
        });

        if (!post) {
          throw new NotFoundException('Post not found!');
        }
        if(post?.userId !== userId){
          throw new ForbiddenException('You are not authorized to UPDATE this post!');
        }

        //update post
        const updatedPost = await this.prisma.post.update({
          where: { id: postId },
          data,
        });
    
        return updatedPost;


      } catch (error) {
        return {message: error.message}
      }
  }

  async deletePost(userId: number, postId: number){

      //delete post by ID only if user is the one who created it
      try {
        const post = await this.prisma.post.findUnique({
          where: { id: postId },
        });

        if (!post) {
          throw new NotFoundException('Post not found!');
        }
        if(post?.userId !== userId){
          throw new ForbiddenException('You are not authorized to delete this post!');
        }

         await this.prisma.post.delete({
          where: {
            id:postId, 
          },
      })

      return {message:`Post '${post.title}' has been deleted!`}

      } catch (error) {
        return {message: error.message}
      }
  }
  
}
