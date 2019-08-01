/**
 * @file Main.java
 * @brief メイン用Javaファイル
 */


//パッケージ
package com.toff_monaka.excel_to_csv.main;


//インポート
import java.io.*;


/**
 * メインクラス
 */

public class Main {
	/**
	 * メイン関数
	 *
	 * @param app_param_ary …アプリケーションパラメータ配列
	 */
    
	public static void main(String[] app_param_ary)
	{
        //アプリケーションパラメータ数チェック
		if (app_param_ary.length != 3) { //アプリケーションパラメータ数が異常の時
			System.out.println("エラー:アプリケーションパラメータ数が異常です:excel_path csv_path charset");
			
			System.exit(0);
        }
        
        String excel_path = app_param_ary[0];
        
        if (excel_path.length() <= 0) { //文字列無しの時
			System.out.println("エラー:エクセルパスが空です");
			
			System.exit(0);
        }
        
		System.out.println("excel_path=" + excel_path);

        String csv_path = app_param_ary[1];

        if (csv_path.length() <= 0) { //文字列無しの時
			System.out.println("エラー:CSVパスが空です");
			
			System.exit(0);
        }

		System.out.println("csv_path=" + csv_path);

        String charset = app_param_ary[2];

        if (charset.length() <= 0) { //文字列無しの時
			System.out.println("エラー:文字セットが空です");
			
			System.exit(0);
        }

		System.out.println("charset=" + charset);

		{//エクセルからCSV作成
			String[] add_column_name_ary = null;
			String[] add_column_val_ary = null;
			String last_column_name = "invalid_flg";
			String invalid_column_name = "invalid_flg";
			String[] invalid_column_invalid_val_ary = {"1", "1.0", ""};
			String comment_prefix = "_";
			
			if (CSVFileUtil.createCSVFromExcel(csv_path, excel_path, charset, add_column_name_ary, add_column_val_ary, last_column_name, invalid_column_name, invalid_column_invalid_val_ary, comment_prefix) < 0) { //失敗の時
				System.out.println("エラー:エクセルからCSV作成");
				
				System.exit(0);
			}
		}
		
        return;
	}
}
