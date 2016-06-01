<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head></head>
<body>


<h1> dictionary   </h1>

	<table border="2" width="90%">
	<tr>
		<td valign="top"> name_article </td>
		<td> name_text </td>
		<td> url </td>
	</tr>
	<xsl:apply-templates/> 
	</table>

</body>
</html>
</xsl:template>

<xsl:template match="article">
    <tr>
	<td><b><xsl:apply-templates select="name_article"/></b></td>
	<td><xsl:apply-templates select="text_article"/></td>
	<td><a><xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute><xsl:value-of select="name_url"/></a></td>
    </tr>
</xsl:template>

</xsl:stylesheet>
