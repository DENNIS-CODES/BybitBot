import { CONFIG } from "../config/config";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
export class GoogleSheet {
  readonly doc: GoogleSpreadsheet;
  sheet: GoogleSpreadsheetWorksheet | undefined;

  constructor(doc_id = CONFIG.sheet_id) {
    this.doc = new GoogleSpreadsheet(doc_id);
  }

  setup = async () => {
    await this.doc.useServiceAccountAuth({
      client_email: CONFIG.email!,
      private_key: CONFIG.key!,
    });
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsByIndex[0];

    await this.sheet.loadCells("A1:T27");
  };
  updateCell = async (value: string) => {
    let live_price = this.sheet?.getCell(3, 3);
    live_price!.value = value;
    await this.sheet!.saveUpdatedCells();
  };
}
