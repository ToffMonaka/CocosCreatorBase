/**
 * @file Main.java
 * @brief ���C���pJava�t�@�C��
 */


//�p�b�P�[�W
package com.toff_monaka.excel_to_csv.main;


//�C���|�[�g
import java.io.*;


/**
 * ���C���N���X
 */

public class Main {
	/**
	 * ���C���֐�
	 *
	 * @param app_param_ary �c�A�v���P�[�V�����p�����[�^�z��
	 */
    
	public static void main(String[] app_param_ary)
	{
        //�A�v���P�[�V�����p�����[�^���`�F�b�N
		if (app_param_ary.length != 3) { //�A�v���P�[�V�����p�����[�^�����ُ�̎�
			System.out.println("�G���[:�A�v���P�[�V�����p�����[�^�����ُ�ł�:excel_path csv_path charset");
			
			System.exit(0);
        }
        
        String excel_path = app_param_ary[0];
        
        if (excel_path.length() <= 0) { //�����񖳂��̎�
			System.out.println("�G���[:�G�N�Z���p�X����ł�");
			
			System.exit(0);
        }
        
		System.out.println("excel_path=" + excel_path);

        String csv_path = app_param_ary[1];

        if (csv_path.length() <= 0) { //�����񖳂��̎�
			System.out.println("�G���[:CSV�p�X����ł�");
			
			System.exit(0);
        }

		System.out.println("csv_path=" + csv_path);

        String charset = app_param_ary[2];

        if (charset.length() <= 0) { //�����񖳂��̎�
			System.out.println("�G���[:�����Z�b�g����ł�");
			
			System.exit(0);
        }

		System.out.println("charset=" + charset);

		{//�G�N�Z������CSV�쐬
			String[] add_column_name_ary = null;
			String[] add_column_val_ary = null;
			String last_column_name = "invalid_flg";
			String invalid_column_name = "invalid_flg";
			String[] invalid_column_invalid_val_ary = {"1", "1.0", ""};
			String comment_prefix = "_";
			
			if (CSVFileUtil.createCSVFromExcel(csv_path, excel_path, charset, add_column_name_ary, add_column_val_ary, last_column_name, invalid_column_name, invalid_column_invalid_val_ary, comment_prefix) < 0) { //���s�̎�
				System.out.println("�G���[:�G�N�Z������CSV�쐬");
				
				System.exit(0);
			}
		}
		
        return;
	}
}
