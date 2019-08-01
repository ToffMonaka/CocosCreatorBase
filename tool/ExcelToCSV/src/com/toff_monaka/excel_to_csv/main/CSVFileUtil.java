/**
 * @file CSVFileUtil.java
 * @brief CSV�t�@�C�����[�e�B���e�B�pJava�t�@�C��
 */


//�p�b�P�[�W
package com.toff_monaka.excel_to_csv.main;


//�C���|�[�g
import java.io.*;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;


/**
 * CSV�t�@�C�����[�e�B���e�B�N���X
 * 
 * <br><br>
 * 
 * �C���X�^���X�����s��
 */

public class CSVFileUtil {
	/**
	 * �R���X�g���N�^
	 */
	
	private CSVFileUtil()
	{
		return;
	}
	
	
	/**
	 * �G�N�Z������CSV�쐬�֐�
	 *
	 * @param csv_dir_path �cCSV�f�B���N�g���p�X
	 * @param excel_dir_path �c�G�N�Z���f�B���N�g���p�X
	 * @param charset �c�����Z�b�g
	 * @param add_column_name_ary �c�ǉ��J�������z��(null=�w�薳��)
	 * @param add_column_val_ary �c�ǉ��J�����l�z��(null=�w�薳��)
	 * @param last_column_name �c�Ō�̃J������
	 * @param invalid_column_name �c�����J������
	 * @param invalid_column_invalid_val_ary �c�����J���������l�z��
	 * @param comment_prefix �c�R�����g�ړ���
	 *
	 * @return ���ʒl(0����=���s)
	 */
	
	@SuppressWarnings("deprecation")
	public static int createCSVFromExcel(String csv_dir_path, String excel_dir_path, String charset, String[] add_column_name_ary, String[] add_column_val_ary, String last_column_name, String invalid_column_name, String[] invalid_column_invalid_val_ary, String comment_prefix)
	{
		int create_csv_file_res = 0;

		//CSV�t�@�C���쐬
		do {
	        String[] excel_file_path_list = null;
	        
	        {//�G�N�Z���t�@�C���p�X���X�g�쐬
	            excel_file_path_list = FileUtil.getFilePathList(excel_dir_path, "xls");
	            
	            if (excel_file_path_list == null) { //���s�̎�
					create_csv_file_res = -1;
					
					break;
	            }
	            
	            //�\�[�g
	            for (int i = 0; i < excel_file_path_list.length; i++) {
					String excel_file_path1 = excel_file_path_list[i];
					
					for (int j = (i + 1); j < excel_file_path_list.length; j++) {
						String excel_file_path2 = excel_file_path_list[j];
						
						if (excel_file_path1.compareTo(excel_file_path2) > 0) { //�傫����
							String tmp_excel_file_path = excel_file_path_list[i];
							
							excel_file_path_list[i] = excel_file_path_list[j];
							excel_file_path_list[j] = tmp_excel_file_path;
							
							excel_file_path1 = excel_file_path_list[i];
						}
					}
				}
	        }
			
			//�ϊ�
			for (int excel_file_path_list_i = 0; excel_file_path_list_i < excel_file_path_list.length; excel_file_path_list_i++) {
				String excel_file_path = excel_file_path_list[excel_file_path_list_i];

				System.out.println("");
				System.out.println("�ϊ��J�n");

				{//���������t���b�V��
					//�ҋ@
					try {
						Thread.sleep(40L);
					} catch (Exception e) {
						e.printStackTrace();
					}
					
					System.gc();
					
					//�ҋ@
					try {
						Thread.sleep(40L);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				String tbl_name = "";
				
				{//�e�[�u�����쐬
					File excel_file = new File(excel_file_path);
					String excel_file_name = excel_file.getName();
					
					int str_index = excel_file_name.lastIndexOf(".xls");
					
					if (str_index < 0) { //������Ȃ�������
						System.out.println("�G���[:�t�@�C���p�X���ُ�ł�:" + excel_file_path);
						
						create_csv_file_res = -1;
						
						break;
					}
					
					tbl_name = excel_file_name.substring(0, str_index);
					
					if (tbl_name.isEmpty()) { //�󕶎���̎�
						System.out.println("�G���[:�e�[�u�������ُ�ł�:" + excel_file_path);
						
						create_csv_file_res = -1;
						
						break;
					}
				}
				
				System.out.println("�e�[�u����=" + tbl_name);
				
				StringBuilder dat = new StringBuilder();
				boolean save_dat_flg = false;
				
				//�f�[�^�쐬
				do {
					//�R�����g�e�[�u���`�F�b�N
					if (!(comment_prefix.isEmpty())) { //������L��̎�
						if (tbl_name.indexOf(comment_prefix) == 0) { //�ŏ��Ɍ���������
							System.out.println("�R�����g�e�[�u��");
							
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
						
						if (row_cnt <= 0) { //�s�������̎�
							System.out.println("�G���[:�s�����ُ�ł�:" + row_cnt);
							
							create_csv_file_res = -1;
							
							break;
						}

						int cell_cnt = (int)(sheet.getRow(0).getLastCellNum() - sheet.getRow(0).getFirstCellNum());
						
						if (cell_cnt <= 0) { //�Z���������̎�
							System.out.println("�G���[:�Z�������ُ�ł�:" + cell_cnt);
							
							create_csv_file_res = -1;
							
							break;
						}

						System.out.println("���R�[�h��=" + (row_cnt - 1));
						System.out.println("�J������=" + cell_cnt);
						
						String[][] my_excel = null;
						
						{//�}�C�G�N�Z���쐬
							my_excel = new String[row_cnt][cell_cnt];
						
							for (int row_i = 0; row_i < row_cnt; row_i++) {
								HSSFRow row = sheet.getRow(row_i);
								
								for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
									String val = "";
									
									if (row != null) { //�s�L��̎�
										HSSFCell cell = row.getCell((short)cell_i);
										
										if (cell != null) { //�Z���L��̎�
											if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) { //���l�̎�
												val = cell.toString();
												
												{//�����̢.0����폜
													int str_index = val.lastIndexOf(".0");
													
													if ((str_index >= 0) && (str_index == (val.length() - 2))) { //�����̎�
														val = val.substring(0, str_index);
													}
												}
											} else if (cell.getCellType() == HSSFCell.CELL_TYPE_FORMULA) { //�����̎�
												val = Double.toString(cell.getNumericCellValue());
												
												{//�����̢.0����폜
													int str_index = val.lastIndexOf(".0");
													
													if ((str_index >= 0) && (str_index == (val.length() - 2))) { //�����̎�
														val = val.substring(0, str_index);
													}
												}
											} else { //����ȊO�̎�
												val = cell.toString();
											}
										} else { //�Z�������̎�
											val = "";
										}
									}
									
									my_excel[row_i][cell_i] = val;
								}
							}
						}
						
						{//�w�b�_�[�s�`�F�b�N
							//�Ŋ��̃J�������`�F�b�N
							if (!(last_column_name.isEmpty())) { //������L��̎�
								String column_name = my_excel[0][cell_cnt - 1];
								
								if ((column_name.isEmpty()) //�󕶎���̎�
								|| (!(column_name.equals(last_column_name)))) { //��������v�̎�
									System.out.println("�G���[:�Ŋ��̃J���������ُ�ł�:" + column_name);
									
									create_csv_file_res = -1;
									
									break;
								}
							}
						
							boolean all_comment_column_name_flg = true;
						
							for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
								String column_name = my_excel[0][cell_i];

								if (column_name.isEmpty()) { //�󕶎���̎�
									System.out.println("�G���[:�J���������ُ�ł�:" + column_name);
									
									create_csv_file_res = -1;
									
									break;
								}
								
								if (!(comment_prefix.isEmpty())) { //������L��̎�
									if (column_name.indexOf(comment_prefix) != 0) { //�ŏ��Ɍ�����Ȃ�������
										all_comment_column_name_flg = false;
									}
								}
							}
							
							if (create_csv_file_res < 0) { //���s�̎�
								break;
							}
							
							if (all_comment_column_name_flg) { //�S�R�����g�J�������̎�
								System.out.println("�S�R�����g�J����");
						
								break;
							}
						}
						
						boolean add_rec_flg = false;
						
						for (int row_i = 1; row_i < row_cnt; row_i++) {
							System.out.print("\r[" + row_i + "/" + (row_cnt - 1) + "]                    ");
							
							//�ҋ@
							if ((row_i % 200) == 0) { //0�̎�
								try {
									Thread.sleep(20L);
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
							
							//�������R�[�h�`�F�b�N
							if (!(invalid_column_name.isEmpty())) { //������L��̎�
								String column_val = my_excel[row_i][cell_cnt - 1];
								
								boolean invalid_val_flg = false;
								
								for (int invalid_column_invalid_val_i = 0; invalid_column_invalid_val_i < invalid_column_invalid_val_ary.length; invalid_column_invalid_val_i++) {
									if (column_val.equals(invalid_column_invalid_val_ary[invalid_column_invalid_val_i])) { //�������v�̎�
										invalid_val_flg = true;
									
										break;
									}
								}
								
								if (invalid_val_flg) { //�����l�̎�
									continue;
								}
							}

							if (add_rec_flg) { //���R�[�h�ǉ��L��̎�
								dat.append("\r\n");
							}
							
							boolean add_column_val_flg = false;

							for (int cell_i = 0; cell_i < cell_cnt; cell_i++) {
								if (!(comment_prefix.isEmpty())) { //������L��̎�
									String column_name = my_excel[0][cell_i];
								
									if (column_name.indexOf(comment_prefix) == 0) { //�ŏ��Ɍ���������
										continue;
									}
								}
								
								String column_val = my_excel[row_i][cell_i];

								if (add_column_val_flg) { //�J�����l�ǉ��L��̎�
									dat.append(",");
								}
								
								column_val = column_val.replaceAll("\"", "\"\"");
								
								dat.append("\"");
								dat.append(column_val);
								dat.append("\"");
								
								add_column_val_flg = true;
							}
							
							if (add_column_val_ary != null) { //�ǉ��J�����l�z��L��̎�
								for (int add_column_i = 0; add_column_i < add_column_val_ary.length; add_column_i++) {
									String column_val = add_column_val_ary[add_column_i];
									
									if (add_column_val_flg) { //�J�����l�ǉ��L��̎�
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
						
						if (add_rec_flg) { //���R�[�h�ǉ��L��̎�
							dat.append("\r\n");
						}
					} catch (Exception e) {
						e.printStackTrace();
						
						catch_type = 1;
					} finally {
			            if (file_is != null) { //�t�@�C���C���v�b�g�X�g���[���L��̎�
			                try {
			                	file_is.close();
			                } catch (IOException e) {
			    	        	e.printStackTrace();
			                } finally {
			                	file_is = null;
			                }
			            }
					}
					
					if (catch_type != 0) { //�L���b�`�^�C�v�L��̎�
						System.out.println("");
						System.out.println("�G���[:�ϊ��Ɏ��s���܂���");
						
						create_csv_file_res = -1;
						
						break;
					}
					
					save_dat_flg = true;
				} while (false);

				if (create_csv_file_res < 0) { //���s�̎�
					break;
				}

				//�f�[�^�ۑ�
				do {
					if (!(save_dat_flg)) { //�f�[�^�ۑ������̎�
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
		                if (bw != null) { //�o�b�t�@���C�^�[�L��̎�
		                    try {
		                        bw.close();
		                    } catch (IOException e) {
		                        e.printStackTrace();
			                } finally {
			                    bw = null;
		                    }
		                }
		            }
		            
					if (catch_type != 0) { //�L���b�`�^�C�v�L��̎�
						System.out.println("");
						System.out.println("�G���[:�f�[�^�ۑ�");
						
						create_csv_file_res = -1;
						
						break;
					}
				} while (false);

				if (create_csv_file_res < 0) { //���s�̎�
					break;
				}
				
				System.out.println("");
				System.out.println("�ϊ��I��");
				System.out.println("");
			}
		} while (false);
		
		return (create_csv_file_res);
	}
}
