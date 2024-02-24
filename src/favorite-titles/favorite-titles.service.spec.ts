import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteTitlesService } from './favorite-titles.service';

describe('FavoriteTitlesService', () => {
  let service: FavoriteTitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteTitlesService],
    }).compile();

    service = module.get<FavoriteTitlesService>(FavoriteTitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
