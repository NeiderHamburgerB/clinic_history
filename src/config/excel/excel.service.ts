import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as moment from 'moment';

@Injectable()
export class ExcelService {
  private path = join(process.cwd(), 'src', 'config', 'excel', 'files');
  constructor() {}

  private config = (): {
    workbook: ExcelJs.Workbook;
    patientInfoSheet: ExcelJs.Worksheet;
  } => {
    const workbook = new ExcelJs.Workbook();
    workbook.creator = 'Heippi historia clinica';
    workbook.created = new Date();

    const patientInfoSheet = workbook.addWorksheet('Historial del paciente', {
      properties: { tabColor: { argb: '03e3fc' } },
    });

    patientInfoSheet.columns = [
      { header: 'Nombre paciente', key: 'namep', width: 40 },
      { header: 'Nombre consulta', key: 'name', width: 40 },
      { header: 'Especialidad', key: 'specialty', width: 40 },
      { header: 'Diagnostico', key: 'diagnosis', width: 65 },
      { header: 'Doctor que atendio', key: 'doctor', width: 40 },
    ];
    patientInfoSheet.getColumn('A').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    patientInfoSheet.getColumn('B').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    patientInfoSheet.getColumn('C').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    patientInfoSheet.getColumn('D').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    patientInfoSheet.getColumn('E').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    return { workbook, patientInfoSheet };
  };

  createDoc = async (data: any) => {
    let { workbook, patientInfoSheet } = this.config();

    for (let i = 0; i <= data.length - 1; i++) {
      patientInfoSheet.getCell(i + 2, 1).value = data[i].patient.name;
      patientInfoSheet.getCell(i + 2, 2).value = data[i].name;
      patientInfoSheet.getCell(i + 2, 3).value = data[i].specialty;
      patientInfoSheet.getCell(i + 2, 4).value = data[i].diagnosis;
      patientInfoSheet.getCell(i + 2, 5).value = data[i].doctor.name;
    }

    const Footers = this.BoldFooter(patientInfoSheet, 1);

    patientInfoSheet = Footers.patientInfoSheet;

    let date = workbook.created;

    var CurrentDate = moment().unix();

    await workbook.xlsx.writeFile(
      `${this.path}/${data[0].patient.name.trim()}-${CurrentDate}.xlsx`,
    );
    return `${this.path}/${data[0].patient.name.trim()}-${CurrentDate}.xlsx`;
  };

  private BoldFooter = (
    patientInfoSheet: ExcelJs.Worksheet,
    patientInfoSheetRow: number,
  ): {
    patientInfoSheet: ExcelJs.Worksheet;
  } => {
    patientInfoSheet.getRow(patientInfoSheetRow).eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 10,
        bold: true,
      };
    });
    return { patientInfoSheet };
  };
}
