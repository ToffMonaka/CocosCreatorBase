/**
 * @file FileUtil.java
 * @brief �t�@�C�����[�e�B���e�B�pJava�t�@�C��
 */


//�p�b�P�[�W
package com.toff_monaka.excel_to_csv.main;


//�C���|�[�g
import java.io.*;


/**
 * �t�@�C�����[�e�B���e�B�N���X
 * 
 * <br><br>
 * 
 * �C���X�^���X�����s��
 */

public class FileUtil {
	/**
	 * �R���X�g���N�^
	 */
	
	private FileUtil()
	{
		return;
	}


	/**
	 * �t�@�C���p�X���X�g�擾�֐�
	 *
	 * @param dir_path �c�f�B���N�g���p�X
	 * @param ext �c�g���q
	 *
	 * @return �t�@�C���p�X���X�g(null=���s)
	 */
	
    public static String[] getFilePathList(String dir_path, String ext)
    {
        File dir = new File(dir_path);
        
        if (!(dir.isDirectory())) { //�f�B���N�g���łȂ���
            return (null);
        }
        
        if (dir.listFiles().length <= 0) { //�f�B���N�g��������̎�
            return (null);
        }
        
        String[] file_path_list = null;
        
        return (FileUtil.getFilePathList(file_path_list, dir.getAbsolutePath(), ext));
    }


	/**
	 * �t�@�C���p�X���X�g�擾�֐�
	 *
	 * @param dst_file_path_list �c��t�@�C���p�X���X�g
	 * @param dir_path �c�f�B���N�g���p�X
	 * @param ext �c�g���q
	 *
	 * @return �t�@�C���p�X���X�g
	 */
	
    private static String[] getFilePathList(String[] dst_file_path_list, String dir_path, String ext)
    {
        File dir = new File(dir_path);
        
        if (!(dir.isDirectory())) { //�f�B���N�g���łȂ���
            return (dst_file_path_list);
        }
        
        File[] file_ary = dir.listFiles();
        
        for (int i = 0; i < file_ary.length; i++) {
            File file = file_ary[i];

            if (file.isDirectory()) { //�f�B���N�g���̎�
                dst_file_path_list = FileUtil.getFilePathList(dst_file_path_list, file.getAbsolutePath(), ext);
            } else { //�f�B���N�g���łȂ���
                if (file.getPath().substring(file.getPath().lastIndexOf(".") + 1).equals(ext)) { //�g���q����v�̎�
                    if (dst_file_path_list == null) { //��t�@�C���p�X���X�g�����̎�
                        dst_file_path_list = new String[1];
                        
                        dst_file_path_list[0] = file.getAbsolutePath();
                    } else { //��t�@�C���p�X���X�g�L��̎�
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
