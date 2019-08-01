/**
 * @file FileUtil.java
 * @brief ファイルユーティリティ用Javaファイル
 */


//パッケージ
package com.toff_monaka.excel_to_csv.main;


//インポート
import java.io.*;


/**
 * ファイルユーティリティクラス
 * 
 * <br><br>
 * 
 * インスタンス生成不可
 */

public class FileUtil {
	/**
	 * コンストラクタ
	 */
	
	private FileUtil()
	{
		return;
	}


	/**
	 * ファイルパスリスト取得関数
	 *
	 * @param dir_path …ディレクトリパス
	 * @param ext …拡張子
	 *
	 * @return ファイルパスリスト(null=失敗)
	 */
	
    public static String[] getFilePathList(String dir_path, String ext)
    {
        File dir = new File(dir_path);
        
        if (!(dir.isDirectory())) { //ディレクトリでない時
            return (null);
        }
        
        if (dir.listFiles().length <= 0) { //ディレクトリ内が空の時
            return (null);
        }
        
        String[] file_path_list = null;
        
        return (FileUtil.getFilePathList(file_path_list, dir.getAbsolutePath(), ext));
    }


	/**
	 * ファイルパスリスト取得関数
	 *
	 * @param dst_file_path_list …先ファイルパスリスト
	 * @param dir_path …ディレクトリパス
	 * @param ext …拡張子
	 *
	 * @return ファイルパスリスト
	 */
	
    private static String[] getFilePathList(String[] dst_file_path_list, String dir_path, String ext)
    {
        File dir = new File(dir_path);
        
        if (!(dir.isDirectory())) { //ディレクトリでない時
            return (dst_file_path_list);
        }
        
        File[] file_ary = dir.listFiles();
        
        for (int i = 0; i < file_ary.length; i++) {
            File file = file_ary[i];

            if (file.isDirectory()) { //ディレクトリの時
                dst_file_path_list = FileUtil.getFilePathList(dst_file_path_list, file.getAbsolutePath(), ext);
            } else { //ディレクトリでない時
                if (file.getPath().substring(file.getPath().lastIndexOf(".") + 1).equals(ext)) { //拡張子が一致の時
                    if (dst_file_path_list == null) { //先ファイルパスリスト無しの時
                        dst_file_path_list = new String[1];
                        
                        dst_file_path_list[0] = file.getAbsolutePath();
                    } else { //先ファイルパスリスト有りの時
                        String[] tmp_file_path_list = dst_file_path_list;
                        
                        dst_file_path_list = new String[tmp_file_path_list.length + 1];

                        for (int j = 0; j < tmp_file_path_list.length; j++) {
                            dst_file_path_list[j] = tmp_file_path_list[j];
                        }
                        
                        dst_file_path_list[tmp_file_path_list.length] = file.getAbsolutePath();
                    }
                }
            }
        }
        
        return (dst_file_path_list);
    }
}
