import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { DatabaseService } from '../src/database/database.service.js';
import { setupSwagger } from '../src/swagger.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    setupSwagger(app);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api-json (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api-json')
      .expect(200);

    expect(response.body).toMatchObject({
      openapi: expect.any(String),
      paths: {
        '/': expect.any(Object),
      },
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
