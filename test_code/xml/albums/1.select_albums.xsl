<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
	<meta charset="utf-8"/>
	<title>Albums</title>
<script>
function processnode(nnodeid)
{
//alert (nnodeid);
 if (document.getElementById(nnodeid).style.display == "none")
   {
    document.getElementById(nnodeid).style.display = ""
   }
 else
   {
    document.getElementById(nnodeid).style.display = "none"
   }
}
</script>
	<style>
.main
{
	width:700px;
	margin:auto;
	text-align:center;
	border:1px solid;
}
.album
{
	float:left;
	width:100px;
	height:100px;
	border:1px solid;
	margin:20px;
	padding:5px;
	text-align:center;
}
.list_pictures
{
	position:absolute;
	top:30px;
	left:30px;
	width:700px;
	border:1px solid;
	background:#ffffff;
}
.picture
{
	float:left;
	/*width:300px;*/
	min-height:300px;
	margin:10px;
}
.field_title_value
{
	width:300px;
	margin:10px;
}
.content
{
}
.close
{
	float:right;
	margin:10px;
}
	</style>
</head>
<body>

<div class="main">
<h2>Мастера графики</h2>

<!--<xsl:variable name="url_content" select="'http://mycomp'"/>-->
<xsl:variable name="url_content" select="'http://albums.vhost.16mb.com'"/>

<xsl:for-each select="document('export.xml')/albums/album">
	<div class="album">
		<!-- <b><xsl:number/>. </b> -->
		<div class="album_title">
			<a href="#"><xsl:value-of select="@name"/></a>
		</div>
		
		<xsl:variable name="n1" select="position()"/>
		<div class="list_pictures_link">
			<a href='javascript:processnode("album_{$n1}")'>view</a>
		</div>
		
		<div class="list_pictures" style='display:none' id="album_{$n1}">
			<div class="close">
			<a href="#" 
onClick="javascript:document.getElementById('album_{$n1}').style.display = 'none'"> close</a>
			</div>
			
			<div class="content">
			<xsl:for-each select="child::node">
				<div class="picture">
					<img src='{$url_content}/{./preview_img}'/>
					<div class="field_title_value">
						<xsl:value-of select="field_title_value"/>
					</div>
				</div>
			</xsl:for-each>
			</div>
			
		</div>	<!-- end list_pictures -->
			
	</div>
</xsl:for-each>
<div style="clear:both"></div>
<h2>Wizard graphics</h2>
</div> <!-- end main -->

</body>
</html>

</xsl:template>
</xsl:stylesheet>

