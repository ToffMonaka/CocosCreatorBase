/**
 * @file CSVFileUtil.java
 * @brief CSVファイルユーティリティ用Javaファイル
 */


//パッケージ
package com.toff_monaka.excel_to_csv.main;


//インポート
import java.io.*;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;


/**
 * CSVファイルユーティリティクラス
 * 
 * <br><br>
 * 
 * インスタンス生成不可
 */

public class CSVFileUtil {
	/**
	 * コンストラクタ
	 */
	
	private CSVFileUtil()
	{
		return;
	}
	
	
	/**
	 * エクセルからCSV作成関数
	 *
	 * @param csv_dir_path …CSVディレクトリパス
	 * @param excel_dir_path …エクセルディレクトリパス
	 * @param charset …文字セット
	 * @param add_column_name_ary …追加カラム名配列(null=指定無し)
	 * @param add_column_val_ary …追加カラム値配列(null=指定無し)
	 * @param last_column_name …最後のカラム名
	 * @param invalid_column_name …無効カラム名
	 * @param invalid_column_invalid_val_ary …無効カラム無効値配列
	 * @param comment_prefix …コメント接頭辞
	 *
	 * @return 結果値(0未満=失敗)
	 */
	
	@SuppressWarnings("deprecation")
	public static int createCSVFromExcel(String csv_dir_path, String excel_dir_path, String charset, String[] add_column_name_ary, String[] add_column_val_ary, String last_column_name, String invalid_column_name, String[] invalid_column_invalid_val_ary, String comment_prefix)
	{
		int create_csv_file_res = 0;

		//CSVファイル作成
		do {
	        String[] excel_file_path_list = null;
	        
	        {//エクセルファイルパスリスト作成
	            excel_file_path_list = FileUtil.getFilePathList(excel_dir_path, "xls");
	            
	            if (excel_file_path_list == null) { //失敗の時
					create_csv_file_res = -1;
					
					break;
	            }
	            
	            //ソート
	            for (int i = 0; i < excel_file_path_list.length; i++) {
					String excel_file_path1 = excel_file_path_list[i];
					
					for (int j = (i + 1); j < excel_file_path_list.length; j++) {
						String excel_file_path2 = excel_file_path_list[j];
						
						if (excel_file_path1.compareTo(excel_file_path2) > 0) { //大きい時
							String tmp_excel_file_path = excel_file_path_list[i];
							
							excel_file_path_list[i] = excel_file_path_list[j];
							excel_file_path_list[j] = tmp_excel_file_path;
							
							excel_file_path1 = excel_file_path_list[i];
						}
					}
				}
	        }
			
			//変換
			for (int excel_file_path_list_i = 0; excel_file_path_list_i < excel_file_path_list.length; excel_file_path_list_i++) {
				String excel_file_path = excel_file_path_list[excel_file_path_list_i];

				System.out.println("");
				System.out.println("変換開始");

				{//メモリリフレッシュ
					//待機
					try {
						Thread.sleep(40L);
					} catch (Exception e) {
						e.printStackTrace();
					}
					
					System.gc();
					
					//待機
					try {
						Thread.sleep(40L);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				String tbl_name = "";
				
				{//テーブル名作成
					File excel_file = new File(excel_file_path);
					String excel_file_name = excel_file.getName();
					
					int str_index = excel_file_name.lastIndexOf(".xls");
					
					if (str_index < 0) { //見つからなかった時
						System.out.println("エラー:ファイルパスが異常です:" + excel_file_path);
						
						create_csv_file_res = -1;
						
						break;
					}
					
					tbl_name = excel_file_name.substring(0, str_index);
					
					if (tbl_name.isEmpty()) { //空文字列の時
						System.out.println("エラー:テーブル名が異常です:" + excel_file_path);
						
						create_csv_file_res = -1;
						
						break;
					}
				}
				
				System.out.println("テーブル名=" + tbl_name);
				
				StringBuilder dat = new StringBuilder();
				boolean save_dat_flg = false;
				
				//データ作成
				do {
					//コメントテーブルチェック
					if (!(comment_prefix.isEmpty())) { //文字列有りの時
						if (tbl_name.indexOf(comment_prefix) == 0) { //最初に見つかった時
							System.out.println("コメントテーブル");
							
							break;
						}
					}
					
					FileInputStream file_is = null;
					
					int catch_type = 0;
					
					try {
						file_is = new FileInputStream(excel_file_path);
						
						POIFSFileSystem poifs_file_sys = new POIFSFileSystem(file_is);
						
						HSSFWorkbook wb = new HSSFWorkbook(poifs_file_sys);
						
						HSSFSheet sheet = wb.getSheetAt(0);

						int row_cnt = sheet.getLastRowNum() - sheet.getFirstRowNum() + 1;
						
						if (row_cnt <= 0) { //行数無しの時
							System.out.println("エラー:行数が異常です:" + row_cnt);
							
							create_csv_file_res = -1;
							
							break;
						}

						int cell_cnt = (int)(sheet.getRow(0).getLastCellNum() - sheet.getRow(0).getFirstCellNum());
						
						if (cell_cnt <= 0) { //セル数無しの時
							System.out.println("エラー:セル数が異常です:" + cell_cnt);
							
							create_csv_file_res = -1;
							
							break;
						}

						System.out.println("レコード数=" + (row_cnt - 1));
						System.out.println("カラム数=" + cell_cnt);
						
						String[][] my_excel = null;
						
						{//マイエクセル作成
							my_excel = new String[row_cnt][cell_cnt];
						
							for (int row_i = 0; row_i < row_cnt; row_i++) {
								HSSFRow row = sheet.getRow(row_i);
								
								for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
									String val = "";
									
									if (row != null) { //行有りの時
										HSSFCell cell = row.getCell((short)cell_i);
										
										if (cell != null) { //セル有りの時
											if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) { //数値の時
												val = cell.toString();
												
												{//末尾の｢.0｣を削除
													int str_index = val.lastIndexOf(".0");
													
													if ((str_index >= 0) && (str_index == (val.length() - 2))) { //末尾の時
														val = val.substring(0, str_index);
													}
												}
											} else if (cell.getCellType() == HSSFCell.CELL_TYPE_FORMULA) { //数式の時
												val = Double.toString(cell.getNumericCellValue());
												
												{//末尾の｢.0｣を削除
													int str_index = val.lastIndexOf(".0");
													
													if ((str_index >= 0) && (str_index == (val.length() - 2))) { //末尾の時
														val = val.substring(0, str_index);
													}
												}
											} else { //それ以外の時
												val = cell.toString();
											}
										} else { //セル無しの時
											val = "";
										}
									}
									
									my_excel[row_i][cell_i] = val;
								}
							}
						}
						
						{//ヘッダー行チェック
							//最期のカラム名チェック
							if (!(last_column_name.isEmpty())) { //文字列有りの時
								String column_name = my_excel[0][cell_cnt - 1];
								
								if ((column_name.isEmpty()) //空文字列の時
								|| (!(column_name.equals(last_column_name)))) { //文字列非一致の時
									System.out.println("エラー:最期のカラム名が異常です:" + column_name);
									
									create_csv_file_res = -1;
									
									break;
								}
							}
						
							boolean all_comment_column_name_flg = true;
						
							for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
								String column_name = my_excel[0][cell_i];

								if (column_name.isEmpty()) { //空文字列の時
									System.out.println("エラー:カラム名が異常です:" + column_name);
									
									create_csv_file_res = -1;
									
									break;
								}
								
								if (!(comment_prefix.isEmpty())) { //文字列有りの時
									if (column_name.indexOf(comment_prefix) != 0) { //最初に見つからなかった時
										all_comment_column_name_flg = false;
									}
								}
							}
							
							if (create_csv_file_res < 0) { //失敗の時
								break;
							}
							
							if (all_comment_column_name_flg) { //全コメントカラム名の時
								System.out.println("全コメントカラム");
						
								break;
							}
						}
						
						boolean add_rec_flg = false;
						
						for (int row_i = 1; row_i < row_cnt; row_i++) {
							System.out.print("\r[" + row_i + "/" + (row_cnt - 1) + "]                    ");
							
							//待機
							if ((row_i % 200) == 0) { //0の時
								try {
									Thread.sleep(20L);
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
							
							//無効レコードチェック
							if (!(invalid_column_name.isEmpty())) { //文字列有りの時
								String column_val = my_excel[row_i][cell_cnt - 1];
								
								boolean invalid_val_flg = false;
								
								for (int invalid_column_invalid_val_i = 0; invalid_column_invalid_val_i < invalid_column_invalid_val_ary.length; invalid_column_invalid_val_i++) {
									if (column_val.equals(invalid_column_invalid_val_ary[invalid_column_invalid_val_i])) { //文字列一致の時
										invalid_val_flg = true;
									
										break;
									}
								}
								
								if (invalid_val_flg) { //無効値の時
									continue;
								}
							}

							if (add_rec_flg) { //レコード追加有りの時
								dat.append("\r\n");
							}
							
							boolean add_column_val_flg = false;

							for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
								if (!(comment_prefix.isEmpty())) { //文字列有りの時
									String column_name = my_excel[0][cell_i];
								
									if (column_name.indexOf(comment_prefix) == 0) { //最初に見つかった時
										continue;
									}
								}
								
								String column_val = my_excel[row_i][cell_i];

								if (add_column_val_flg) { //カラム値追加有りの時
									dat.append(",");
								}
								
								column_val = column_val.replaceAll("\"", "\"\"");
								
								dat.append("\"");
								dat.append(column_val);
								dat.append("\"");
								
								add_column_val_flg = true;
							}
							
							if (add_column_val_ary != null) { //追加カラム値配列有りの時
								for (int add_column_i = 0; add_column_i < add_column_val_ary.length; add_column_i++) {
									String column_val = add_column_val_ary[add_column_i];
									
									if (add_column_val_flg) { //カラム値追加有りの時
										dat.append(",");
									}
									
									column_val = column_val.replaceAll("\"", "\"\"");
								
									dat.append("\"");
									dat.append(column_val);
									dat.append("\"");
									
									add_column_val_flg = true;
								}
							}
							
							add_rec_flg = true;
						}
						
						if (add_rec_flg) { //レコード追加有りの時
							dat.append("\r\n");
						}
					} catch (Exception e) {
						e.printStackTrace();
						
						catch_type = 1;
					} finally {
			            if (file_is != null) { //ファイルインプットストリーム有りの時
			                try {
			                	file_is.close();
			                } catch (IOException e) {
			    	        	e.printStackTrace();
			                } finally {
			                	file_is = null;
			                }
			            }
					}
					
					if (catch_type != 0) { //キャッチタイプ有りの時
						System.out.println("");
						System.out.println("エラー:変換に失敗しました");
						
						create_csv_file_res = -1;
						
						break;
					}
					
					save_dat_flg = true;
				} while (false);

				if (create_csv_file_res < 0) { //失敗の時
					break;
				}

				//データ保存
				do {
					if (!(save_dat_flg)) { //データ保存無しの時
						break;
					}
					
					String csv_file_path = csv_dir_path + "/" + tbl_name + ".csv";
				
		            BufferedWriter bw = null;
		            
					int catch_type = 0;
		            
		            try {
		                bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csv_file_path), charset));
		                
		                bw.write(dat.toString());
		                bw.flush();
		            } catch (IOException e) {
		                e.printStackTrace();
		                
		                catch_type = 1;
		            } finally {
		                if (bw != null) { //バッファライター有りの時
		                    try {
		                        bw.close();
		                    } catch (IOException e) {
		                        e.printStackTrace();
			                } finally {
			                    bw = null;
		                    }
		                }
		            }
		            
					if (catch_type != 0) { //キャッチタイプ有りの時
						System.out.println("");
						System.out.println("エラー:データ保存");
						
						create_csv_file_res = -1;
						
						break;
					}
				} while (false);

				if (create_csv_file_res < 0) { //失敗の時
					break;
				}
				
				System.out.println("");
				System.out.println("変換終了");
				System.out.println("");
			}
		} while (false);
		
		return (create_csv_file_res);
	}
}
