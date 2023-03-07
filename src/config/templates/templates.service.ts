import { Injectable } from '@nestjs/common';
import { renderFile } from 'pug';
import { join } from 'path';

@Injectable()
export class TemplatesService {
  private readonly templates: string = join(
    process.cwd(),
    'src',
    'config',
    'templates',
    'designs',
    'blocks',
  );

  private readonly quotedPrintable = (template: string): string => {
    return template
  }

  welcome = (params: any) =>
    this.quotedPrintable(renderFile(join(this.templates, 'welcome.pug'), params))
  
} 
